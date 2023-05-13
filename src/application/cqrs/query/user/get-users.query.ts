import { GetUserDto } from "../../../use-case/user/dto/get-user.dto";

export class GetUsersQuery {
    constructor(
        public params?: GetUserDto
    ) { }
}
