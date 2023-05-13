import { GetCourseDto } from "../../../use-case/course/dto/get-course.dto";

export class GetCourseQuery {
    constructor(
        public params?: GetCourseDto
    ) { }
}
