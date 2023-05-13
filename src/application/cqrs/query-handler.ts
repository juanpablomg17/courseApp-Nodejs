
import { UserQuery } from './query/user/user.query';
import { CourseQuery } from './query/course/course.query'


export const QueryHandlers = [
    ...UserQuery,
    ...CourseQuery
];