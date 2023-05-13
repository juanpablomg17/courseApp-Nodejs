import { InjectRepository } from '@nestjs/typeorm';

import { IUserRepository } from '../../../domain/interface/IUser';
import { Repository } from 'typeorm'
import { Users } from './user.model';



type QueryFilter = string | Record<string, string | boolean>;

export class UserRepository implements IUserRepository<string, Users, unknown | Users>{

    constructor(@InjectRepository(Users) private userRepository: Repository<Users>) { }


    async getAll(filter?: string): Promise<Users[]> {
        try {
            return this.userRepository.find();
        } catch (error) {
            console.log(error)
        }
    }
    getByKey(filter: string): Promise<Users[]> {
        throw new Error('Method not implemented.');
    }
    getInside?(filter: string): Promise<Users[]> {
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