
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


import { GetCourseUsecase } from '../../use-case/course/get-course-usecase';
import { CreateCourseUsecase } from '../../use-case/course/create-course-usecase';
import { CourseDto } from '../../use-case/course/dto/course.dto';
import { GetCourseDto } from '../../use-case/course/dto/get-course.dto';



@ApiTags('course')
@Controller('course')
export class CourseController {
    constructor(
        private readonly getCourseUseCase: GetCourseUsecase,
        private readonly createCourseUseCase: CreateCourseUsecase
    ) { }
    @Post('')
    async createCourse(@Body() request: CourseDto) {
        return await this.createCourseUseCase.execute(request);
    }

    @Get('')
    async getCourse(@Query() request: GetCourseDto) {
        return await this.getCourseUseCase.execute(request);
    }
}