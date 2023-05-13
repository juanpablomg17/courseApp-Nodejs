import { Courses } from "../../infrastucture/repository/course/course.model";



import { CourseDto } from "../use-case/course/dto/course.dto";
import { GetCourseDto } from '../use-case/course/dto/get-course.dto'
import { v4 as uuidv4 } from 'uuid';


export class CouseMapper {
    public static toPersistance(course: CourseDto | GetCourseDto): Courses {
        return  {
            id: uuidv4(15),
            name: course.name
        }
    }

    public static toModel(course: GetCourseDto): Courses {
        return  {
            id: course.id,
            name: course.name
        }
    }
}