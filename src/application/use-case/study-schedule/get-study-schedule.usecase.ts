import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { GetStudyScheduleQuery } from '../../cqrs/query/study-schedule/get-study-schedule.query';
import { UseCase } from '../../../domain/interface/IUseCase';
import { GetStudyScheduleDto } from './dto/get-study-schedule.dto';
import { StudySchedule } from '../../../infrastucture/repository/study-schedule/study-schedule.model'
import { GetUsersUseCase } from '../user/get-user-usecase'
import { UserMapper } from '../../mapper/user-mapper'
import { type } from 'os';




@Injectable()
export class GetStudyScheduleUsecase implements UseCase<GetStudyScheduleDto, StudySchedule[]> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly getUserUseCase: GetUsersUseCase

    ) { }
    async execute(request?: GetStudyScheduleDto): Promise<StudySchedule[]> {

        const user = await this.getUserUseCase.execute({ id: request.userId });
        if (!user || user.length === 0) {
            throw new HttpException('User not found', HttpStatus.ACCEPTED);
        }

        const userModel = UserMapper.toModel(user[0]);

        return this.queryBus.execute<GetStudyScheduleQuery, StudySchedule[]>(
            new GetStudyScheduleQuery({user: userModel})
        );
        
        
    }
}