import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { GetCourseByListUsecase } from './get-course-by-list.usecase';
import { GetCourseUsecase } from './get-course-usecase';
import { CouseMapper } from '../../mapper/course-mapper';

const mockCourse = {
  id: 'test-id',
  name: 'test-course'
};

const mockGetCourseUseCase = {
  execute: jest.fn(() => [mockCourse]),
};

const mockToModel = jest.spyOn(CouseMapper, 'toModel').mockImplementation(() => mockCourse);

describe('GetCourseByListUsecase', () => {
  let usecase: GetCourseByListUsecase;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        GetCourseByListUsecase,
        { provide: GetCourseUsecase, useValue: mockGetCourseUseCase }
      ],
    }).compile();

    usecase = moduleRef.get<GetCourseByListUsecase>(GetCourseByListUsecase);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('execute', () => {
    it('should return an array of courses', async () => {
      const courses = await usecase.execute(['test-course']);
      expect(courses).toEqual([mockCourse]);
    });

    it('should throw an HttpException when a course is not found', async () => {
      mockGetCourseUseCase.execute.mockReturnValue([]);
      await expect(usecase.execute(['invalid-course'])).rejects.toThrow(HttpException);
      await expect(usecase.execute(['invalid-course'])).rejects.toThrow('HOUSTON, COURSE WITH ID invalid-course NOT FOUND');
    });
  });

  describe('ToDBModel', () => {
    it('should return an array of Courses', () => {
      const courses = usecase.ToDBModel([mockCourse]);
      expect(courses).toEqual([mockCourse]);
      expect(mockToModel).toHaveBeenCalledTimes(1);
      expect(mockToModel).toHaveBeenCalledWith(mockCourse);
    });
  });
});
