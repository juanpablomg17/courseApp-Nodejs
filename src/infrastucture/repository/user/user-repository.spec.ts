import { Repository } from 'typeorm';
import { UserRepository } from './user-repository';
import { Users } from './user.model';

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let mockRepository: jest.Mocked<Repository<Users>>;

  beforeEach(() => {
    mockRepository = {
        find: jest.fn(),
        findBy: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
    } as unknown as jest.Mocked<Repository<Users>>;

    userRepository = new UserRepository(mockRepository);
  });

  it('Should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  it('should call find method when getAll is called', async () => {
    const mockData: Users[] = [
      { id: "1", fullname: 'John Doe', email: 'johndoe@example.com' },
      { id: "2", fullname: 'Jane Smith', email: 'janesmith@example.com' },
    ];

    mockRepository.find.mockResolvedValueOnce(mockData);

    const result = await userRepository.getAll();

    expect(mockRepository.find).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  it('should call findBy method with correct options when getByKey is called', async () => {
    const mockFilter = { id: "1" };

    const mockData: Users[] = [{ id: "1", fullname: 'John Doe', email: 'johndoe@example.com' }];

    mockRepository.findBy.mockResolvedValueOnce(mockData);

    const result = await userRepository.getByKey(mockFilter);

    expect(mockRepository.findBy).toHaveBeenCalledWith({
      id: mockFilter.id,
    });
    expect(result).toEqual(mockData);
  });

  it('should call create and save methods when save is called', async () => {
    const mockUser: Users = { id: "1", fullname: 'John Doe', email: 'johndoe@example.com' };

    mockRepository.create.mockReturnValueOnce(mockUser);
    mockRepository.save.mockResolvedValueOnce(mockUser);

    const result = await userRepository.save(mockUser);

    expect(mockRepository.create).toHaveBeenCalledWith(mockUser);
    expect(mockRepository.save).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockUser);
  });
});