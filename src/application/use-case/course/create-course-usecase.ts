import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CommandBus, } from '@nestjs/cqrs';

import { CreateCourseCommand } from '../../cqrs/command/course/create-course.command'
import { CouseMapper } from '../../mapper/course-mapper';
import { CourseDto } from './dto/course.dto';
import { UseCase } from '../../../domain/interface/IUseCase';
import { GetCourseUsecase } from './get-course-usecase'



type Input = CourseDto
type Output = void

@Injectable()
export class CreateCourseUsecase implements UseCase<Input, Output> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly getCourseUsecase: GetCourseUsecase
    ) { }

    async execute(input: Input): Promise<Output> {
            const course = await this.getCourseUsecase.execute({name: input.name})
            if (course.length > 0) {
                throw new HttpException('Course already exists', HttpStatus.BAD_REQUEST)
            }
            const courseModel = CouseMapper.toPersistance(input);
            const response = this.commandBus.execute(new CreateCourseCommand(courseModel));
            return response
    }
}
