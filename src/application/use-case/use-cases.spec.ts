import { UseCases } from './use-cases';
import { GetUsersUseCase } from './user/get-user-usecase';
import { CreateUserUseCase } from './user/create-user-usecase';
import { CreateCourseUsecase } from './course/create-course-usecase';
import { GetCourseUsecase } from './course/get-course-usecase';
import { GetCourseByListUsecase } from './course/get-course-by-list.usecase';
import { CreateStudyScheduleUseCase } from './study-schedule/create-study-schedule.usecase';
import { GetStudyScheduleUsecase } from './study-schedule/get-study-schedule.usecase';

describe('UseCases', () => {
  it('should contain all use cases', () => {
    const expectedUseCases = [
      GetUsersUseCase,
      CreateUserUseCase,
      CreateCourseUsecase,
      GetCourseUsecase,
      GetCourseByListUsecase,
      CreateStudyScheduleUseCase,
      GetStudyScheduleUsecase,
    ];
    expect(UseCases).toEqual(expectedUseCases);
  });
});
