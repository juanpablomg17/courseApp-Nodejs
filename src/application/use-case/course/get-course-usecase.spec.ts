import { Test, TestingModule } from '@nestjs/testing';
import { QueryBus } from '@nestjs/cqrs';
import { GetCourseQuery } from '../../cqrs/query/course/get-course.query';
import { GetCourseDto } from './dto/get-course.dto';
import { GetCourseUsecase } from './get-course-usecase';

describe('GetCourseUsecase', () => {
  let usecase: GetCourseUsecase;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetCourseUsecase,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    usecase = module.get<GetCourseUsecase>(GetCourseUsecase);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  describe('execute', () => {
    it('should return an array of courses', async () => {
      const request: GetCourseDto = {
        id: '1234',
      };
      const expectedResult: GetCourseDto[] = [
        {
          id: '1234',
          name: 'Course 1',
        },
        {
          id: '5678',
          name: 'Course 2',
        },
      ];
      jest.spyOn(queryBus, 'execute').mockResolvedValue(expectedResult);

      const result = await usecase.execute(request);

      expect(result).toEqual(expectedResult);
      expect(queryBus.execute).toHaveBeenCalledWith(
        new GetCourseQuery(request),
      );
    });
  });
});
