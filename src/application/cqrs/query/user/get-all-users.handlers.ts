import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { USER_REPOSITORY, IUserRepository } from '../../../../domain/interface/IUser';
import { Users } from '../../../../infrastucture/repository/user/user.model';
import { GetAllUsersQuery } from './get-all-users.query';
type QueryFilter = string | Record<string, string | boolean | any>;

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IQueryHandler<GetAllUsersQuery, Users[]>{
    constructor(@Inject(USER_REPOSITORY) private readonly repository: IUserRepository<QueryFilter, Users, void>) { }
    async execute(query: GetAllUsersQuery): Promise<Users[]> {
        return this.repository.getAll();
    }
}