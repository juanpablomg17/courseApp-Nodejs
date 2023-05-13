import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllCoursesQuery } from '../../cqrs/query/course/get-all-courses.query';
import { UseCase } from '../../../domain/interface/IUseCase';
import { GetCourseDto } from './dto/get-course.dto';
import { CourseDto } from './dto/course.dto';

@Injectable()
export class GetCourseUsecase implements UseCase<GetCourseDto, GetCourseDto[]> {
    constructor(private readonly queryBus: QueryBus) { }
    async execute(request?: GetCourseDto): Promise<GetCourseDto[]> {
        return this.queryBus.execute<GetAllCoursesQuery, GetCourseDto[]>(
            new GetAllCoursesQuery(request)
        );
    }
}