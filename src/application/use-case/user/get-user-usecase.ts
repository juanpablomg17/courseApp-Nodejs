import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUsersQuery } from '../../cqrs/query/user/get-users.query';
import { UseCase } from '../../../domain/interface/IUseCase';
import { GetUserDto } from './dto/get-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class GetUsersUseCase implements UseCase<GetUserDto, UserDto[]> {
    constructor(private readonly queryBus: QueryBus) { }
    async execute(request?: GetUserDto): Promise<UserDto[]> {
        return this.queryBus.execute<GetUsersQuery, UserDto[]>(
            new GetUsersQuery(request)
        );
    }
}