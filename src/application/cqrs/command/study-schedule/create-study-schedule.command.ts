import { StudySchedule  } from '../../../../infrastucture/repository/study-schedule/study-schedule.model';

export class CreateStudyScheduleCommand {
    constructor(
        public readonly studyScheduleData: StudySchedule,
    ) {}
}