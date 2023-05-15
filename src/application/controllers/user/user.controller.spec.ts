import { Test } from '@nestjs/testing';
import { CreateUserDto } from '../../use-case/user/dto/create-user.dto';
import { GetUserDto } from '../../use-case/user/dto/get-user.dto';
import { GetUsersUseCase } from '../../use-case/user/get-user-usecase';
import { CreateUserUseCase } from '../../use-case/user/create-user-usecase';
import { UserController } from './user.controller';
import { QueryBus } from '@nestjs/cqrs';

describe('UserController', () => {
    let userController: UserController;
    let createUserUseCase: CreateUserUseCase;
    let getAllUserUseCase: GetUsersUseCase;


    const createUseMock = {
        execute: jest.fn(),
    };

    const getAllUserUseCaseMock = {
        execute: jest.fn(),
    }

    const queryBusMock = {
        execute: jest.fn(),
    }

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                {
                    provide: GetUsersUseCase,
                    useValue: getAllUserUseCaseMock
                },
                {
                    provide: CreateUserUseCase,
                    useValue: createUseMock,
                },
                {
                    provide: QueryBus,
                    useValue: queryBusMock,
                }
            ],
        }).compile();

        userController = moduleRef.get<UserController>(UserController);
        createUserUseCase = moduleRef.get<CreateUserUseCase>(CreateUserUseCase);
        getAllUserUseCase = moduleRef.get<GetUsersUseCase>(GetUsersUseCase);
    });

    describe('createUser', () => {
        it('should create a user', async () => {
            const createUserDto: CreateUserDto = {
                fullname: 'John Doe',
                email: 'johndoe@example.com',
            };
            const expected = { message: 'User created successfully' };

            jest.spyOn(createUseMock, 'execute').mockResolvedValueOnce(expected);

            const result = await userController.createUser(createUserDto);

            expect(createUserUseCase.execute).toHaveBeenCalledWith(createUserDto);
            expect(result).toEqual(expected);
        });
    });

      describe('getUser', () => {
        it('should return users', async () => {
          const getUsersDto: GetUserDto = {
            fullname: 'John Doe',
            email: 'johndoe@example.com',
          };
          const expected = [
            {
              id: '1234',
              fullname: 'John Doe',
              email: 'johndoe@example.com',
            },
          ];

          jest.spyOn(getAllUserUseCaseMock, 'execute').mockResolvedValueOnce(expected);

          const result = await userController.getUser(getUsersDto);

          expect(getAllUserUseCase.execute).toHaveBeenCalledWith(getUsersDto);
          expect(result).toEqual(expected);
        });
      });
});
