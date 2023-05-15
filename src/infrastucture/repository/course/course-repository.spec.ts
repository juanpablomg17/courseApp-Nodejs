import { Repository } from 'typeorm';
import { CourseRepository } from './course-repository';
import { Courses } from './course.model';

describe('CourseRepository', () => {
  let courseRepository: CourseRepository;
  let mockRepository: jest.Mocked<Repository<Courses>>;

  beforeEach(() => {
    mockRepository = {
        find: jest.fn(),
        findBy: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
    } as unknown as jest.Mocked<Repository<Courses>>;

    courseRepository = new CourseRepository(mockRepository);
  });

  it('Should be defined', () => {
    expect(courseRepository).toBeDefined();
  });

  it('should call find method when getAll is called', async () => {
    const mockData: Courses[] = [
      { id: "1", name: 'course1'},
      { id: "2", name: 'course2'},
    ];

    mockRepository.find.mockResolvedValueOnce(mockData);

    const result = await courseRepository.getAll();

    expect(mockRepository.find).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  it('should call findBy method with correct options when getByKey is called', async () => {
    const mockFilter = { id: "1" };

    const mockData: Courses[] = [{ id: "1", name: 'course1'}];

    mockRepository.findBy.mockResolvedValueOnce(mockData);

    const result = await courseRepository.getByKey(mockFilter);

    expect(mockRepository.findBy).toHaveBeenCalledWith({
      id: mockFilter.id,
    });
    expect(result).toEqual(mockData);
  });

  it('should call create and save methods when save is called', async () => {
    const mockUser: Courses = { id: "1", name: 'course1'};

    mockRepository.create.mockReturnValueOnce(mockUser);
    mockRepository.save.mockResolvedValueOnce(mockUser);

    const result = await courseRepository.save(mockUser);

    expect(mockRepository.create).toHaveBeenCalledWith(mockUser);
    expect(mockRepository.save).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockUser);
  });
});