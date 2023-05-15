import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto  } from '../../use-case/user/dto/create-user.dto'

import { GetUsersUseCase } from '../../use-case/user/get-user-usecase';
import { CreateUserUseCase } from '../../use-case/user/create-user-usecase';
import { GetUserDto } from '../../use-case/user/dto/get-user.dto';


@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(
        private readonly getAllUserUseCase: GetUsersUseCase,
        private readonly createUserUseCase: CreateUserUseCase
    ) { }
    @Post('')
    async createUser(@Body() request: CreateUserDto) {
        return await this.createUserUseCase.execute(request);
    }

    @Get('')
    async getUser(@Query() request: GetUserDto) {
        return await this.getAllUserUseCase.execute(request);
    }
}
