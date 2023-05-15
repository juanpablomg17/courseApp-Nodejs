import { Test } from '@nestjs/testing';
import { CourseDto } from '../../use-case/course/dto/course.dto';
import { GetCourseDto } from '../../use-case/course/dto/get-course.dto';
import { GetCourseUsecase } from '../../use-case/course/get-course-usecase';
import { CreateCourseUsecase } from '../../use-case/course/create-course-usecase';
import { CourseController } from './course.controller';
import { QueryBus } from '@nestjs/cqrs';

describe('CourseController', () => {
    let courseController: CourseController;
    let createCourseUseCase: CreateCourseUsecase;
    let getCoursesUseCase: GetCourseUsecase;


    const createCourseMock = {
        execute: jest.fn(),
    };

    const getCoursesUseCaseMock = {
        execute: jest.fn(),
    }

    const queryBusMock = {
        execute: jest.fn(),
    }

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [CourseController],
            providers: [
                {
                    provide: GetCourseUsecase,
                    useValue: getCoursesUseCaseMock
                },
                {
                    provide: CreateCourseUsecase,
                    useValue: createCourseMock,
                },
                {
                    provide: QueryBus,
                    useValue: queryBusMock,
                }
            ],
        }).compile();

        courseController = moduleRef.get<CourseController>(CourseController);
        createCourseUseCase = moduleRef.get<CreateCourseUsecase>(CreateCourseUsecase);
        getCoursesUseCase = moduleRef.get<GetCourseUsecase>(GetCourseUsecase);
    });

    describe('createcourse', () => {
        it('should create a course', async () => {
            const createcourseDto: CourseDto = {name: 'course1'};
            const expected = { message: 'course created successfully' };

            jest.spyOn(createCourseMock, 'execute').mockResolvedValueOnce(expected);

            const result = await courseController.createCourse(createcourseDto);

            expect(createCourseUseCase.execute).toHaveBeenCalledWith(createcourseDto);
            expect(result).toEqual(expected);
        });
    });

      describe('getcourse', () => {
        it('should return courses', async () => {
          const getcoursesDto: GetCourseDto = {name: 'course1'}
          const expected = [
            {
              id: '1234',
              fullname: 'John Doe',
              email: 'johndoe@example.com',
            },
          ];

          jest.spyOn(getCoursesUseCaseMock, 'execute').mockResolvedValueOnce(expected);

          const result = await courseController.getCourse(getcoursesDto);

          expect(getCoursesUseCase.execute).toHaveBeenCalledWith(getcoursesDto);
          expect(result).toEqual(expected);
        });
      });
});
