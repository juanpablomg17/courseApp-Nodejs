import { GetUsersUseCase } from './get-user-usecase';
import { CreateUserUseCase } from './create-user-usecase';
import { UserUseCases } from './user-usecases';

describe('UserUseCases', () => {
  it('should contain GetUsersUseCase and CreateUserUseCase', () => {
    expect(UserUseCases).toContain(GetUsersUseCase);
    expect(UserUseCases).toContain(CreateUserUseCase);
  });
});
