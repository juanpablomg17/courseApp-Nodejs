import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { STUDY_SCHEDULE_REPOSITORY, IStudyScheduleRepository } from '../../../../domain/interface/ISchedule';
import { StudySchedule } from '../../../../infrastucture/repository/study-schedule/study-schedule.model';
import { GetStudyScheduleQuery } from './get-study-schedule.query';
import { getStudyScheduleFromModelDtoType } from '../../../use-case/study-schedule/dto/get-study-schedule-from-model.dto'



type QueryFilter = getStudyScheduleFromModelDtoType;

@QueryHandler(GetStudyScheduleQuery)
export class GetStudyScheduleHandler implements IQueryHandler<GetStudyScheduleQuery, StudySchedule[]>{
    constructor(@Inject(STUDY_SCHEDULE_REPOSITORY) private readonly repository: IStudyScheduleRepository<QueryFilter, StudySchedule, void>) { }
    async execute(query: GetStudyScheduleQuery): Promise<StudySchedule[]> {
        return this.repository.getByKey({user: query.params.user});
    }
}