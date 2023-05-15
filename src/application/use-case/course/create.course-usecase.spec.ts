import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateCourseCommand } from '../../cqrs/command/course/create-course.command';
import { CourseDto } from './dto/course.dto';
import { CreateCourseUsecase } from './create-course-usecase';
import { GetCourseUsecase } from './get-course-usecase';

jest.mock('./get-course-usecase');

describe('CreateCourseUsecase', () => {
  let usecase: CreateCourseUsecase;
  let commandBus: CommandBus;
  let getCourseUsecase: GetCourseUsecase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCourseUsecase,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetCourseUsecase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    usecase = module.get<CreateCourseUsecase>(CreateCourseUsecase);
    commandBus = module.get<CommandBus>(CommandBus);
    getCourseUsecase = module.get<GetCourseUsecase>(GetCourseUsecase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should create a new course when it does not exist', async () => {
      const input: CourseDto = {
        name: 'English 101',
      };
      jest.spyOn(getCourseUsecase, 'execute').mockResolvedValueOnce([]);

      await usecase.execute(input);

      expect(getCourseUsecase.execute).toHaveBeenCalledWith({ name: input.name });
      expect(commandBus.execute).toHaveBeenCalledWith(new CreateCourseCommand({ id: expect.any(String), name: input.name }));
    });

    it('should throw an exception when the course already exists', async () => {
      const input: CourseDto = {
        name: 'English 101',
      };
      jest.spyOn(getCourseUsecase, 'execute').mockResolvedValueOnce([input]);

      await expect(usecase.execute(input)).rejects.toThrowError(
        new HttpException('Course already exists', HttpStatus.BAD_REQUEST),
      );

      expect(getCourseUsecase.execute).toHaveBeenCalledWith({ name: input.name });
      expect(commandBus.execute).not.toHaveBeenCalled();
    });
  });
});
