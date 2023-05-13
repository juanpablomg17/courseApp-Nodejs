import { InjectRepository } from '@nestjs/typeorm';

import { IUserRepository } from '../../../domain/interface/IUser';
import { FindOptionsWhere, Repository } from 'typeorm'
import { Users } from './user.model';

import { TypeGetUserDto } from '../../../application/use-case/user/dto/get-user.dto'



type QueryFilter = TypeGetUserDto

export class UserRepository implements IUserRepository<QueryFilter, Users, unknown | Users>{

    constructor(@InjectRepository(Users) private userRepository: Repository<Users>) { }


    async getAll(filter?: QueryFilter): Promise<Users[]> {
        try {
            return this.userRepository.find();
        } catch (error) {
            console.log(error)
        }
    }
    getByKey(filter: QueryFilter): Promise<Users[]> {
        try {
            const findOptionsUser: FindOptionsWhere<Users> = {
                id: filter.id,
                fullname: filter.fullname,
                email: filter.email
            }
            return this.userRepository.findBy(findOptionsUser);
        } catch (error) {
            console.log('HOUSTON WE HAVE A PROBLEM IN UserRepository: ERROR: ', error)
        }
    }
    getInside?(filter: QueryFilter): Promise<Users[]> {
        throw new Error('Method not implemented.');
    }
    save(input: Users): Promise<Users> {
        try {
            const newUser = this.userRepository.create(input);
            return this.userRepository.save(newUser);
        } catch (error) {
            console.log(error)
        }

    }
}