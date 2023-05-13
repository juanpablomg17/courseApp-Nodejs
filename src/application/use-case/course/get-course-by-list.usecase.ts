import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetCourseQuery } from '../../cqrs/query/course/get-course.query';
import { UseCase } from '../../../domain/interface/IUseCase';
import { Courses } from '../../../infrastucture/repository/course/course.model'
import { GetCourseDto } from './dto/get-course.dto';
import { GetCourseUsecase } from './get-course-usecase'
import { CouseMapper } from '../../mapper/course-mapper'

type request = string[];

@Injectable()
export class GetCourseByListUsecase implements UseCase<request, GetCourseDto[]> {
    constructor(private readonly getCourseUseCase: GetCourseUsecase) { }

    async execute(courseNames?: string[]): Promise<Courses[]> {
        const coursesList: GetCourseDto[] = []
        for (const courseName of courseNames) {
            const courseFound = await this.getCourseUseCase.execute({ name: courseName });
            if (courseFound.length <= 0) {
                console.log(`HOUSTON, COURSE WITH ID ${courseName} NOT FOUND`)
                throw new HttpException(`HOUSTON, COURSE WITH ID ${courseName} NOT FOUND`, HttpStatus.CONFLICT);
            }
            coursesList.push(...courseFound);
        }
        return this.ToDBModel(coursesList);        
    }

    ToDBModel(courses: GetCourseDto[]): Courses[] {
        const coursesDB: Courses[] = []
        for (const course of courses) {
            coursesDB.push(CouseMapper.toModel(course))
        }
        return coursesDB
    }
}

