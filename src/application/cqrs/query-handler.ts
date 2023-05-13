
import { UserQuery } from './query/user/user.query';
import { CourseQuery } from './query/course/course.query'
import { StudyScheduleQuery } from './query/study-schedule/study-schedule.query';


export const QueryHandlers = [
    ...UserQuery,
    ...CourseQuery,
    ...StudyScheduleQuery
];