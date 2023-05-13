
import { UserCommandHandlers  } from './command/user/user-command.handler';
import { CourseCommandHandlers } from './command/course/course-command.handler';


export const CommandHandlers = [
    ...UserCommandHandlers,
    ...CourseCommandHandlers
];
