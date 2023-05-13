import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { COURSE_REPOSITORY, ICourseRepository } from '../../../../domain/interface/ICourse';
import { Courses } from '../../../../infrastucture/repository/course/course-model';
import { GetAllCoursesQuery } from './get-all-courses.query';
type QueryFilter = string | Record<string, string | boolean | any>;

@QueryHandler(GetAllCoursesQuery)
export class GetAllCoursesHandler implements IQueryHandler<GetAllCoursesQuery, Courses[]>{
    constructor(@Inject(COURSE_REPOSITORY) private readonly repository: ICourseRepository<QueryFilter, Courses, void>) { }
    async execute(query: GetAllCoursesQuery): Promise<Courses[]> {
        return this.repository.getAll();
    }
}