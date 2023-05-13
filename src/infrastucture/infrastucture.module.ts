import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import 'dotenv/config';

import { USER_REPOSITORY } from '../domain/interface/IUser';
import { COURSE_REPOSITORY } from '../domain/interface/ICourse';

import { UserRepository } from './repository/user/user-repository'
import { CourseRepository } from './repository/course/course-repository'
import { Users } from './repository/user/user.model'
import { Courses } from './repository/course/course-model'


@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Courses]),
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
  ],
})
export class InfrastructureModule { }
