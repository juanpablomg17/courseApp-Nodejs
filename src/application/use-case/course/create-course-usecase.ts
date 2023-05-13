import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommandBus, } from '@nestjs/cqrs';

import { CreateCourseCommand } from '../../cqrs/command/course/create-course.command'
import { CouseMapper } from '../../mapper/course-mapper';
import { CourseDto } from './dto/course.dto';
import { UseCase } from '../../../domain/interface/IUseCase';



type Input = CourseDto
type Output = void

@Injectable()
export class CreateCourseUsecase implements UseCase<Input, Output> {
    constructor(
        private readonly commandBus: CommandBus,
    ) { }

    async execute(input: Input): Promise<Output> {
        // const alreadyExistUser = await this.queryBus.execute<GetUserQuery, UserModel[]>(new GetUserQuery(null, input.email));
        // if (alreadyExistUser && alreadyExistUser.length > 0) {
        //     throw new HttpException('User already exist', HttpStatus.CONFLICT);
        // }

        try {
            const courseModel = CouseMapper.toPersistance(input);
            const response = this.commandBus.execute(new CreateCourseCommand(courseModel));
            return response
        } catch (error) {
            console.log("HOUSTON HAS OCURRED A PROBLEM IN CREATE COURSE (USE CASE)", error)
        }
    }
}
