import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateUserCommand } from '../../cqrs/command/user/create-user.command'
import { UserMapper } from '../../mapper/user-mapper';
import { CreateUserDto } from './dto/create-user.dto';
import { UseCase } from '../../../domain/interface/IUseCase';
import { GetUsersUseCase } from './get-user-usecase'
import { UserService } from '../../../domain/user/services/user.service'



type Input = CreateUserDto
type Output = void

@Injectable()
export class CreateUserUseCase implements UseCase<Input, Output> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly getUserUseCase: GetUsersUseCase,
        private readonly userService: UserService,
    ) { }

    async execute(input: Input): Promise<Output> {

        const isValidEmail = this.userService.isValidEmail(input.email)
        if (!isValidEmail) {
            throw new HttpException('Email not valid', HttpStatus.BAD_REQUEST)
        }

        const user = await this.getUserUseCase.execute(input)
        if (user.length > 0) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
        }
        const userModel = UserMapper.toPersistance(input);
        const response = await this.commandBus.execute(new CreateUserCommand(userModel));
        return response
    }
}
