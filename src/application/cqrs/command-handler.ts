
import { UserCommandHandlers  } from './command/user/user-command.handler';
import { CourseCommandHandlers } from './command/course/course-command.handler';
import { StudyScheduleCommandHandlers } from './command/study-schedule/study-schedule-command.handler'


export const CommandHandlers = [
    ...UserCommandHandlers,
    ...CourseCommandHandlers,
    ...StudyScheduleCommandHandlers
];
