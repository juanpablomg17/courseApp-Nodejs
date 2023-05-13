
import { UserUseCases } from './user/user-usecases';
import { CourseUseCases } from './course/course-usecases';


export const UseCases = [
    ...UserUseCases,
    ...CourseUseCases
];