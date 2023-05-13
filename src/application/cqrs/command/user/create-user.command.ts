import { Users } from '../../../../infrastucture/repository/user/user.model'

export class CreateUserCommand {
    constructor(
        public readonly userData: Users,
    ) {}
}