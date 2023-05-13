import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto  } from '../../use-case/user/dto/create-user.dto'
import { ApproveCourseDto } from '../../use-case/user/dto/approve-course.dto'
import { EnrollCourseDto } from '../../use-case/user/dto/enroll-course.dto'

import { GetAllUsersUseCase } from '../../use-case/user/get-user-usecase';
import { UserDto } from 'src/application/use-case/user/dto/user.dto';


@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly getAllUserUseCase: GetAllUsersUseCase
    ) { }
    @Post('')
    async createUser(@Body() request: CreateUserDto) {
        return {
            message: 'User created successfully'
        }
    }

    @Get('')
    async getAllUser() {
        return await this.getAllUserUseCase.execute();
    }

    // @UseGuards(JwtAuthGuardChangePass)
    @Post('/approveCourse')
    async approveCourse(@Body() request: ApproveCourseDto) {
        return {
            message: 'The course was approved'
        }
    }

    @Post('/enrollCourse')
    async enrollCourse(@Body() request: EnrollCourseDto) {
        return {
            message: 'The course was enrolled'
        }
    }

}
