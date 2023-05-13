import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { USER_REPOSITORY, IUserRepository } from '../../../../domain/interface/IUser';
import { Users } from '../../../../infrastucture/repository/user/user.model';
import { GetUsersQuery } from './get-users.query';
import { GetUserDto } from '../../../use-case/user/dto/get-user.dto'


type QueryFilter = GetUserDto;

@QueryHandler(GetUsersQuery)
export class GetUsersHandler implements IQueryHandler<GetUsersQuery, Users[]>{
    constructor(@Inject(USER_REPOSITORY) private readonly repository: IUserRepository<QueryFilter, Users, void>) { }
    async execute(query: GetUsersQuery): Promise<Users[]> {
        return this.repository.getByKey(
            {
                id: query.params?.id,
                fullname: query.params?.fullname,
                email: query.params?.email
            }
        );
    }
}