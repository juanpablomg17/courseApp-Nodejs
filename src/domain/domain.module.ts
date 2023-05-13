import { Module } from '@nestjs/common';
import { CourseService } from './course/service/course.service'
import { UserService } from './user/services/user.service'
@Module({
  providers: [
    CourseService,
    UserService
  ],
  exports: [
    CourseService,
    UserService
  ],
})
export class DomainModule {}
