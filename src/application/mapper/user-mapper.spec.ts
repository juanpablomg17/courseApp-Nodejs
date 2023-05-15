import { Users } from "src/infrastucture/repository/user/user.model";
import { UserDto } from "../use-case/user/dto/user.dto";
import { CreateUserDto } from "../use-case/user/dto/create-user.dto";
import { v4 as uuidv4 } from 'uuid';
import { UserMapper } from "./user-mapper";

describe('UserMapper', () => {
    describe('toPersistance', () => {
        it('should map a CreateUserDto to a Users object', () => {
            const createUserDto: CreateUserDto = {
                fullname: 'John Doe',
                email: 'john.doe@example.com'
            };
            const result: Users = UserMapper.toPersistance(createUserDto);
            expect(result).toHaveProperty('id');
            expect(result.fullname).toBe(createUserDto.fullname);
            expect(result.email).toBe(createUserDto.email);
        });
    });

    describe('toModel', () => {
        it('should map a UserDto to a Users object', () => {
            const userDto: UserDto = {
                id: uuidv4(),
                fullname: 'John Doe',
                email: 'john.doe@example.com'
            };
            const result: Users = UserMapper.toModel(userDto);
            expect(result.id).toBe(userDto.id);
            expect(result.fullname).toBe(userDto.fullname);
            expect(result.email).toBe(userDto.email);
        });
    });
});
