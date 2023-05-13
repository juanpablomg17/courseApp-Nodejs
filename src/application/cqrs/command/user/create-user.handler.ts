import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IUserRepository, USER_REPOSITORY } from '../../../../domain/interface/IUser';
import { Users } from '../../../../infrastucture/repository/user/user.model';
import { CreateUserCommand } from './create-user.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand, Users> {
    constructor(@Inject(USER_REPOSITORY) private readonly repository: IUserRepository<string, Users, Users>) { }
    async execute(command: CreateUserCommand) {
        const { userData } = command
        const response = await this.repository.save(userData)
        return response;
    }
}
