
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto  } from '../../use-case/user/dto/create-user.dto'
import { ApproveCourseDto } from '../../use-case/user/dto/approve-course.dto'
import { EnrollCourseDto } from '../../use-case/user/dto/enroll-course.dto'

import { GetCourseUsecase } from '../../use-case/course/get-course-usecase';
import { CreateCourseUsecase } from '../../use-case/course/create-course-usecase';
import { CourseDto } from '../../use-case/course/dto/course.dto';
import { GetCourseDto } from '../../use-case/course/dto/get-course.dto';



@ApiTags('course')
@Controller('course')
export class CourseController {
    constructor(
        private readonly getAllCourseUseCase: GetCourseUsecase,
        private readonly createCourseUseCase: CreateCourseUsecase
    ) { }
    @Post('')
    async createCourse(@Body() request: CourseDto) {
        return await this.createCourseUseCase.execute(request);
    }


    @Get('')
    async getCourse() {
        return await this.getAllCourseUseCase.execute();
    }
}