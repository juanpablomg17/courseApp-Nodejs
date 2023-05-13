import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateUserCommand } from '../../cqrs/command/user/create-user.command'
import { UserMapper } from '../../mapper/user-mapper';
import { CreateUserDto } from './dto/create-user.dto';
import { UseCase } from '../../../domain/interface/IUseCase';



type Input = CreateUserDto
type Output = void

@Injectable()
export class CreateUserUseCase implements UseCase<Input, Output> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    async execute(input: Input): Promise<Output> {
        // const alreadyExistUser = await this.queryBus.execute<GetUserQuery, UserModel[]>(new GetUserQuery(null, input.email));
        // if (alreadyExistUser && alreadyExistUser.length > 0) {
        //     throw new HttpException('User already exist', HttpStatus.CONFLICT);
        // }

        try {
            const userModel = UserMapper.toPersistance(input);

            const response = await this.commandBus.execute(new CreateUserCommand(userModel));
            return response
        } catch (error) {
            console.log(error)
        }
    }
}
