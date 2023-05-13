import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { COURSE_REPOSITORY, ICourseRepository } from '../../../../domain/interface/ICourse';
import { Courses } from '../../../../infrastucture/repository/course/course.model';
import { GetCourseQuery } from './get-course.query';
import { TypeGetCourseDto } from '../../../use-case/course/dto/get-course.dto'



type QueryFilter = TypeGetCourseDto;

@QueryHandler(GetCourseQuery)
export class GetCoursesHandler implements IQueryHandler<GetCourseQuery, Courses[]>{
    constructor(@Inject(COURSE_REPOSITORY) private readonly repository: ICourseRepository<QueryFilter, Courses, void>) { }
    async execute(query: GetCourseQuery): Promise<Courses[]> {
        return this.repository.getByKey({ id: query.params.id, name: query.params.name });
    }
}