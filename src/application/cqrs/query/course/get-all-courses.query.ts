import { GetCourseDto } from "../../../use-case/course/dto/get-course.dto";

export class GetAllCoursesQuery {
    constructor(
        public params?: GetCourseDto
    ) { }
}
