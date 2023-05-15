import { CreateCourseUsecase } from './create-course-usecase';
import { GetCourseUsecase } from './get-course-usecase';
import { GetCourseByListUsecase } from './get-course-by-list.usecase';
import { CourseUseCases } from './course-usecases';

describe('CourseUseCases', () => {
  it('should contain CreateCourseUsecase', () => {
    const usecase = CourseUseCases.find(usecase => usecase.name === 'CreateCourseUsecase');
    expect(usecase).toBeDefined();
    expect(usecase).toBe(CreateCourseUsecase);
  });

  it('should contain GetCourseUsecase', () => {
    const usecase = CourseUseCases.find(usecase => usecase.name === 'GetCourseUsecase');
    expect(usecase).toBeDefined();
    expect(usecase).toBe(GetCourseUsecase);
  });

  it('should contain GetCourseByListUsecase', () => {
    const usecase = CourseUseCases.find(usecase => usecase.name === 'GetCourseByListUsecase');
    expect(usecase).toBeDefined();
    expect(usecase).toBe(GetCourseByListUsecase);
  });
});
