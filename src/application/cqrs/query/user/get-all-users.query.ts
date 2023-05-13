import { GetUserDto } from "../../../use-case/user/dto/get-user.dto";

export class GetAllUsersQuery {
    constructor(
        public params?: GetUserDto
    ) { }
}
