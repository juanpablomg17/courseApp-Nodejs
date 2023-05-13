import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UseFilters, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CourseDto  } from '../../use-case/course/dto/course.dto'
import { ApproveCourseDto } from '../../use-case/user/dto/approve-course.dto'
import { EnrollCourseDto } from '../../use-case/user/dto/enroll-course.dto'


// @ApiBearerAuth()
@ApiTags('course')
@Controller('course')
export class CourseController {
    constructor(
    ) { }
    @Post('')
    async createCourse(@Body() request: CourseDto) {
        return {
            message: 'User created successfully'
        }
    }


    @Get('')
    async getCourse() {
        return {
            message: 'return all courses'
        }
    }
    
 

}
