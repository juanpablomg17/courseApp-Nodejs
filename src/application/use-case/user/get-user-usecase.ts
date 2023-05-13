import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllUsersQuery } from '../../cqrs/query/user/get-all-users.query';
import { UseCase } from '../../../domain/interface/IUseCase';
import { GetUserDto } from './dto/get-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class GetAllUsersUseCase implements UseCase<GetUserDto, UserDto[]> {
    constructor(private readonly queryBus: QueryBus) { }
    async execute(request?: GetUserDto): Promise<UserDto[]> {
        return this.queryBus.execute<GetAllUsersQuery, UserDto[]>(
            new GetAllUsersQuery(request)
        );
    }
}