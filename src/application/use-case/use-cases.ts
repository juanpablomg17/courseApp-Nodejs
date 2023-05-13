import { UserUseCases } from './user/user-usecases';
import { CourseUseCases } from './course/course-usecases';
import { StudyScheduleUseCases} from './study-schedule/study-schedule-usecases'


export const UseCases = [
    ...UserUseCases,
    ...CourseUseCases,
    ...StudyScheduleUseCases
];