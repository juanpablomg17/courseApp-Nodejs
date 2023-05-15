import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../../domain/user/services/user.service';
import { CreateUserCommand } from '../../cqrs/command/user/create-user.command';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './create-user-usecase';
import { GetUsersUseCase } from './get-user-usecase';
import { UserMapper } from '../../mapper/user-mapper';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let commandBus: CommandBus;
  let getUserUseCase: GetUsersUseCase;

  const userDto: CreateUserDto = {
    fullname: 'John Doe',
    email: 'johndoe@example.com',
  };

  const userModel = UserMapper.toPersistance(userDto);

  const userServiceMock = {
      isValidEmail: jest.fn(),
  }

  const getUserUseCaseMock = {
      execute: jest.fn(),
  }

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserUseCase,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: GetUsersUseCase,
          useValue: getUserUseCaseMock,
        },
        {
          provide: UserService,
          useValue: userServiceMock
        },
      ],
    }).compile();

    createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
    commandBus = moduleRef.get<CommandBus>(CommandBus);
    getUserUseCase = moduleRef.get<GetUsersUseCase>(GetUsersUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    it('should create a new user when given a valid email and user does not already exist', async () => {
      jest.spyOn(getUserUseCaseMock, 'execute').mockResolvedValueOnce([]);
      jest.spyOn(userServiceMock, 'isValidEmail').mockReturnValueOnce(true);

      await createUserUseCase.execute(userDto);

      expect(getUserUseCase.execute).toHaveBeenCalledWith(userDto);
      expect(commandBus.execute).toHaveBeenCalledWith(new CreateUserCommand({ ...userDto, id: expect.any(String) }));
    });

    it('should throw a HttpException when given an invalid email', async () => {
      jest.spyOn(getUserUseCaseMock, 'execute').mockResolvedValueOnce([]);

      jest.spyOn(userServiceMock, 'isValidEmail').mockReturnValueOnce(false);

      await expect(createUserUseCase.execute(userDto)).rejects.toThrow(HttpException);

      expect(getUserUseCase.execute).not.toHaveBeenCalled();
      expect(commandBus.execute).not.toHaveBeenCalled();
    });

    it('should throw a HttpException when given an existing user', async () => {
      jest.spyOn(getUserUseCaseMock, 'execute').mockResolvedValueOnce([userModel]);
      await expect(createUserUseCase.execute(userDto)).rejects.toThrow(HttpException);
    });
  });
});
