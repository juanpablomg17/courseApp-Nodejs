import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { IStudyScheduleRepository, STUDY_SCHEDULE_REPOSITORY } from '../../../../domain/interface/ISchedule';
import { StudySchedule } from '../../../../infrastucture/repository/study-schedule/study-schedule.model';
import { CreateStudyScheduleCommand } from './create-study-schedule.command';

@CommandHandler(CreateStudyScheduleCommand)
export class CreateStudyScheduleHandler implements ICommandHandler<CreateStudyScheduleCommand, StudySchedule> {
    constructor(@Inject(STUDY_SCHEDULE_REPOSITORY) private readonly repository: IStudyScheduleRepository<string, StudySchedule, StudySchedule>) { }
    async execute(command: CreateStudyScheduleCommand) {
        const { studyScheduleData } = command
        const response = await this.repository.save(studyScheduleData)
        return response;
    }
}
