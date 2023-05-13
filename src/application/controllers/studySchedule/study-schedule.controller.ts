
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


import { CreateStudyScheduleUseCase } from '../../use-case/study-schedule/create-study-schedule.usecase';
import { GetStudyScheduleUsecase } from '../../use-case/study-schedule/get-study-schedule.usecase';
import { StudyScheduleDto } from '../../use-case/study-schedule/dto/study-schedule.dto';
import { GetStudyScheduleDto } from '../../use-case/study-schedule/dto/get-study-schedule.dto';



@ApiTags('studySchedule')
@Controller('studySchedule')
export class StudyScheduleController {
    constructor(
        private readonly getStudyScheduleUseCase: GetStudyScheduleUsecase,
        private readonly addStudyScheduleUseCase: CreateStudyScheduleUseCase,
        
    ) { }
    @Post('')
    async addStudySchedule(@Body() request: StudyScheduleDto) {
        return await this.addStudyScheduleUseCase.execute(request);
    }

    @Get('')
    async getStudySchedules(@Query() request: GetStudyScheduleDto) {
        return await this.getStudyScheduleUseCase.execute(request);
    }
}