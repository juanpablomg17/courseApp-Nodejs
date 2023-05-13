import { InjectRepository } from '@nestjs/typeorm';

import { IUserRepository } from '../../../domain/interface/IUser';
import { Repository } from 'typeorm'
import { Courses } from './course-model';



type QueryFilter = string | Record<string, string | boolean>;

export class CourseRepository implements IUserRepository<string, Courses, unknown | Courses>{

    constructor(@InjectRepository(Courses) private userRepository: Repository<Courses>) { }


    async getAll(filter?: string): Promise<Courses[]> {
        try {
            return this.userRepository.find();
        } catch (error) {
            console.log(error)
        }
    }
    getByKey(filter: string): Promise<Courses[]> {
        throw new Error('Method not implemented.');
    }
    getInside?(filter: string): Promise<Courses[]> {
        throw new Error('Method not implemented.');
    }
    save(input: Courses): Promise<Courses> {
        try {
            const newCourse = this.userRepository.create(input);
            return this.userRepository.save(newCourse);
        } catch (error) {
            console.log(error)
        }
    }
}