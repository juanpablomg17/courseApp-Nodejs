import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';


import { StudyScheduleDto } from './dto/study-schedule.dto';
import { UseCase } from '../../../domain/interface/IUseCase';
import { GetUsersUseCase } from '../user/get-user-usecase'
import { GetCourseByListUsecase } from '../course/get-course-by-list.usecase'
import { CourseService } from '../../../domain/course/service/course.service'
import { Courses } from '../../../infrastucture/repository/course/course.model';
import { Users } from '../../../infrastucture/repository/user/user.model';
import { GetStudyScheduleUsecase } from './get-study-schedule.usecase'
import { CreateStudyScheduleCommand } from '../../cqrs/command/study-schedule/create-study-schedule.command'
import { UserMapper } from '../../mapper/user-mapper'
import { v4 as uuidv4 } from 'uuid';




type Input = StudyScheduleDto
type Output = void

@Injectable()
export class CreateStudyScheduleUseCase implements UseCase<Input, Output> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly getUserUseCase: GetUsersUseCase,
        private readonly getCourseByListUseCase: GetCourseByListUsecase,
        public readonly courseService: CourseService,
        public readonly getStudySchedulePerUserUseCase: GetStudyScheduleUsecase
    ) { }

    async execute(input: Input): Promise<Output> {

            let courses: Courses[] = [];
            // verify if user exist
            let userModel: Users;

            const user = await this.getUserUseCase.execute({ id: input.userId });
            if (!user || user.length === 0) {
                throw new HttpException('Cannot create study schedule: User not found', HttpStatus.BAD_REQUEST);
            }
            userModel = UserMapper.toModel(user[0]);

            const studySchedulePerUser = await this.getStudySchedulePerUserUseCase.execute({ userId: input.userId });
            if (studySchedulePerUser.length > 0) {
                throw new HttpException('Cannot create study schedule: User already has a study schedule, finish the previous one', HttpStatus.CONFLICT);
            }

            const courseNameOrder = this.courseService.orderByDependency(input.courses);

            try {
                courses = await this.getCourseByListUseCase.execute(courseNameOrder);

                if (courses.length <= 0) {
                    throw new HttpException('Cannot create study schedule: one or more courses does not exist', HttpStatus.CONFLICT);
                }
            } catch (error) {
                console.log("HOUSTON, HAS OCCURED AN ERROR IN GET COURSE BY LIST USECASE, ERROR: ", error)
                throw new HttpException('Cannot create study schedule: one or more courses does not exist', HttpStatus.CONFLICT);
            }

            try {
                for (let i = 0; i <= input.courses.length; i++) {
                    await this.commandBus.execute(new CreateStudyScheduleCommand(
                        {
                            user: userModel,
                            completecourse: false,
                            course: courses[i],
                            courseorder: i,
                            id: uuidv4(15),
                            coursename: courses[i].name,
                            useremail: userModel.email
                        }
                    ));
                }
            } catch (error) {
                console.log("HOUSTON, HAS OCCURED AN ERROR IN CREATE STUDY SCHEDULE COMMAND, ERROR: ", error)
                throw new HttpException('Cannot create study schedule: has ocourced unexpected error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
    }
}
