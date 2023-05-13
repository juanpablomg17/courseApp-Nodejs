import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetCourseQuery } from '../../cqrs/query/course/get-course.query';
import { UseCase } from '../../../domain/interface/IUseCase';
import { GetCourseDto } from './dto/get-course.dto';


@Injectable()
export class GetCourseUsecase implements UseCase<GetCourseDto, GetCourseDto[]> {
    constructor(private readonly queryBus: QueryBus) { }
    async execute(request?: GetCourseDto): Promise<GetCourseDto[]> {
        return this.queryBus.execute<GetCourseQuery, GetCourseDto[]>(
            new GetCourseQuery(request)
        );
    }
}