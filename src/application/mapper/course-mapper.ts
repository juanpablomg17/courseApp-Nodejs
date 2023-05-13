import { Courses } from "../../infrastucture/repository/course/course-model";



import { CourseDto } from "../use-case/course/dto/course.dto";
import { v4 as uuidv4 } from 'uuid';


export class CouseMapper {
    public static toPersistance(course: CourseDto): Courses {
        return  {
            id: uuidv4(15),
            name: course.name
        }
    }
}