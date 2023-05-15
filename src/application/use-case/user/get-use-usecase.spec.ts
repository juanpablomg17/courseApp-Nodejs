import { Test, TestingModule } from '@nestjs/testing';
import { QueryBus } from '@nestjs/cqrs';
import { GetUsersUseCase } from './get-user-usecase';
import { GetUserDto } from './dto/get-user.dto';
import { UserDto } from './dto/user.dto';

describe('GetUsersUseCase', () => {
  let getUsersUseCase: GetUsersUseCase;
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetUsersUseCase,
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    getUsersUseCase = module.get<GetUsersUseCase>(GetUsersUseCase);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  describe('execute', () => {
    it('should return an array of user DTOs', async () => {
      // Arrange
      const request: GetUserDto = { fullname: 'John Doe' };
      const expected: UserDto[] = [{ id: "1", fullname: 'John Doe', email: 'johndoe@example.com' }];

      jest.spyOn(queryBus, 'execute').mockResolvedValueOnce(expected);

      // Act
      const result = await getUsersUseCase.execute(request);

      // Assert
      expect(result).toEqual(expected);
    });
  });
});
