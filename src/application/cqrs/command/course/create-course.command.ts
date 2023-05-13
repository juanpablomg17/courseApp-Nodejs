import { Courses } from '../../../../infrastucture/repository/course/course.model';

export class CreateCourseCommand {
    constructor(
        public readonly courseData: Courses,
    ) {}
}