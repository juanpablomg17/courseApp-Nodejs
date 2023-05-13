import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ICourseRepository, COURSE_REPOSITORY } from '../../../../domain/interface/ICourse';
import { Courses } from '../../../../infrastucture/repository/course/course.model';
import { CreateCourseCommand } from './create-course.command';

@CommandHandler(CreateCourseCommand)
export class CreateCourseHandler implements ICommandHandler<CreateCourseCommand, Courses> {
    constructor(@Inject(COURSE_REPOSITORY) private readonly repository: ICourseRepository<string, Courses, Courses>) { }
    async execute(command: CreateCourseCommand) {
        const { courseData } = command
        const response = await this.repository.save(courseData)
        return response;
    }
}
