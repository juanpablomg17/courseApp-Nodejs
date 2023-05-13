import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import 'dotenv/config';

import { USER_REPOSITORY } from '../domain/interface/IUser';
import { COURSE_REPOSITORY } from '../domain/interface/ICourse';
import { STUDY_SCHEDULE_REPOSITORY } from '../domain/interface/ISchedule'

import { UserRepository } from './repository/user/user-repository'
import { CourseRepository } from './repository/course/course-repository'
import { StudyScheduleRepository } from './repository/study-schedule/study-schedule-repository'

import { Users } from './repository/user/user.model'
import { Courses } from './repository/course/course.model'
import { StudySchedule } from './repository/study-schedule/study-schedule.model'


@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Courses, StudySchedule]),
  ],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: COURSE_REPOSITORY,
      useClass: CourseRepository,
    },
    {
      provide: STUDY_SCHEDULE_REPOSITORY,
      useClass: StudyScheduleRepository,
    }
    
  ],
  exports: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: COURSE_REPOSITORY,
      useClass: CourseRepository,
    },
    {
      provide: STUDY_SCHEDULE_REPOSITORY,
      useClass: StudyScheduleRepository,
    }
  ],
})
export class InfrastructureModule { }
