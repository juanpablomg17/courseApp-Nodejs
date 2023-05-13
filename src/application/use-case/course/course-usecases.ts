import { CreateCourseUsecase } from './create-course-usecase';
import { GetCourseUsecase } from './get-course-usecase';
import { GetCourseByListUsecase } from './get-course-by-list.usecase'


export const CourseUseCases = [
    CreateCourseUsecase,
    GetCourseUsecase,
    GetCourseByListUsecase
];