import { InjectRepository } from '@nestjs/typeorm';

import { ICourseRepository } from '../../../domain/interface/ICourse';
import { FindOptionsWhere, Repository } from 'typeorm'
import { Courses } from './course.model';

import { TypeGetCourseDto } from '../../../application/use-case/course/dto/get-course.dto'



type QueryFilter = TypeGetCourseDto

export class CourseRepository implements ICourseRepository<QueryFilter, Courses, unknown | Courses>{

    constructor(@InjectRepository(Courses) private userRepository: Repository<Courses>) { }


    async getAll(filter?: QueryFilter): Promise<Courses[]> {
        try {
            return this.userRepository.find();
        } catch (error) {
            console.log(error)
        }
    }
    async getByKey(filter: QueryFilter): Promise<Courses[]> {
        try {
            
            const findOptionsCourse: FindOptionsWhere<Courses> = {
                id: filter.id,
                name: filter.name
            }
            return this.userRepository.findBy(findOptionsCourse);
        } catch (error) {
            console.log('HOUSTON WE HAVE A PROBLEM IN CourseRepository: ERROR: ', error)
        }
    }
    getInside?(filter: TypeGetCourseDto): Promise<Courses[]> {
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