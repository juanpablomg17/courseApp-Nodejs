import { Repository } from 'typeorm';
import { StudyScheduleRepository } from './study-schedule-repository';
import { StudySchedule } from './study-schedule.model';
import { getStudyScheduleFromModelDtoType } from '../../../application/use-case/study-schedule/dto/get-study-schedule-from-model.dto';

describe('StudyScheduleRepository', () => {
    let studyScheduleRepository: StudyScheduleRepository;
    let mockRepository: jest.Mocked<Repository<StudySchedule>>;


    const studySchedulestub: StudySchedule =
    {
        completecourse: false,
        id: "1",
        coursename: 'course1',
        course: {
            id: "1",
            name: 'course1',
        },
        courseorder: 1,
        user: {
            id: "1",
            email: 'email1',
            fullname: 'fullname1',
        },
        useremail: 'email1',
    }

    const studySchedulesStub: StudySchedule[] = [
        studySchedulestub,
        studySchedulestub
    ]

    const dtoMockData: getStudyScheduleFromModelDtoType = {
        user:
        {
            id: "2",
            email: 'email2',
            fullname: 'fullname2',
        }

    }

    beforeEach(() => {
        mockRepository = {
            find: jest.fn(),
            findBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
        } as unknown as jest.Mocked<Repository<StudySchedule>>;

        studyScheduleRepository = new StudyScheduleRepository(mockRepository);
    });

    it('Should be defined', () => {
        expect(studyScheduleRepository).toBeDefined();
    });

    it('should call find method when getAll is called', async () => {
        const mockData: StudySchedule[] = studySchedulesStub;

        mockRepository.find.mockResolvedValueOnce(mockData);

        const result = await studyScheduleRepository.getAll();

        expect(mockRepository.find).toHaveBeenCalled();
        expect(result).toEqual(mockData);
    });

    it('should call findBy method with correct options when getByKey is called', async () => {
        const mockData: StudySchedule[] = studySchedulesStub;
        mockRepository.findBy.mockResolvedValueOnce(mockData);
        const result = await studyScheduleRepository.getByKey(dtoMockData);
        expect(mockRepository.findBy).toHaveBeenCalledWith(dtoMockData);
        expect(result).toEqual(mockData);
    });

    it('should call create and save methods when save is called', async () => {
        const mockUser: StudySchedule = studySchedulestub;

        mockRepository.create.mockReturnValueOnce(mockUser);
        mockRepository.save.mockResolvedValueOnce(mockUser);

        const result = await studyScheduleRepository.save(mockUser);

        expect(mockRepository.create).toHaveBeenCalledWith(mockUser);
        expect(mockRepository.save).toHaveBeenCalledWith(mockUser);
        expect(result).toEqual(mockUser);
    });
});