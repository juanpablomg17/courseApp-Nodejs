import { Module } from '@nestjs/common';
import { CourseService } from '../domain/course/service/course.service'
@Module({
  providers: [
    CourseService
  ],
  exports: [
    CourseService
  ],
})
export class DomainModule {}
