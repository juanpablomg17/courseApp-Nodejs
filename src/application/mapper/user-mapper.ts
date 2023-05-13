import { Users } from "src/infrastucture/repository/user/user.model";
import { UserDto } from "../use-case/user/dto/user.dto";
import { CreateUserDto } from "../use-case/user/dto/create-user.dto";
import { v4 as uuidv4 } from 'uuid';


export class UserMapper {
    public static toPersistance(user: CreateUserDto): Users {
        return  {
            id: uuidv4(15),
            fullname: user.fullname,
            email: user.email
        }
    }

    public static toModel(user: UserDto): Users {
        return  {
            id: user.id,
            fullname: user.fullname,
            email: user.email
        }
    }
}