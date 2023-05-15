import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { GetStudyScheduleUsecase } from './get-study-schedule.usecase';
import { QueryBus } from '@nestjs/cqrs';
import { GetUsersUseCase } from '../user/get-user-usecase';
import { UserMapper } from '../../mapper/user-mapper';
import { GetStudyScheduleQuery } from '../../cqrs/query/study-schedule/get-study-schedule.query';
import { StudySchedule } from '../../../infrastucture/repository/study-schedule/study-schedule.model';
import { GetStudyScheduleDto } from './dto/get-study-schedule.dto';

describe('GetStudyScheduleUsecase', () => {
  let usecase: GetStudyScheduleUsecase;
  let queryBus: QueryBus;
  let getUserUseCase: GetUsersUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetStudyScheduleUsecase,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetUsersUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    usecase = module.get<GetStudyScheduleUsecase>(GetStudyScheduleUsecase);
    queryBus = module.get<QueryBus>(QueryBus);
    getUserUseCase = module.get<GetUsersUseCase>(GetUsersUseCase);
  });

  describe('execute', () => {
    const input: GetStudyScheduleDto = { userId: 'user_id' };
    const user = { id: 'user_id', fullname: 'test', email: 'test@example.com' };
    const userModel = UserMapper.toModel({ id: 'user_id', fullname: 'test', email: 'test@example.com' });
    const studySchedule = [new StudySchedule()];
    const getStudyScheduleQuery = new GetStudyScheduleQuery({
      user: userModel,
    });

    beforeEach(() => {
      jest.spyOn(getUserUseCase, 'execute').mockResolvedValue([user]);
      jest.spyOn(queryBus, 'execute').mockResolvedValue(studySchedule);
    });

    it('should throw an HttpException if user is not found', async () => {
      jest.spyOn(getUserUseCase, 'execute').mockResolvedValue([]);

      await expect(usecase.execute(input)).rejects.toThrow(HttpException);
      await expect(usecase.execute(input)).rejects.toThrowError(
        'User not found',
      );
      await expect(usecase.execute(input)).rejects.toThrowError(HttpException);
    });

    it('should call the GetUserUseCase to get the user', async () => {
      await usecase.execute(input);

      expect(getUserUseCase.execute).toHaveBeenCalledTimes(1);
      expect(getUserUseCase.execute).toHaveBeenCalledWith({ id: input.userId });
    });

    it('should call the QueryBus with the correct query', async () => {
      await usecase.execute(input);

      expect(queryBus.execute).toHaveBeenCalledTimes(1);
      expect(queryBus.execute).toHaveBeenCalledWith(getStudyScheduleQuery);
    });

    it('should return the study schedule', async () => {
      const result = await usecase.execute(input);

      expect(result).toEqual(studySchedule);
    });
  });
});
