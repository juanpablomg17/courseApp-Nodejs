import { InjectRepository } from '@nestjs/typeorm';

import { IStudyScheduleRepository  } from '../../../domain/interface/ISchedule';
import { FindOptionsWhere, Repository } from 'typeorm'
import { StudySchedule } from './study-schedule.model';

import { getStudyScheduleFromModelDtoType } from '../../../application/use-case/study-schedule/dto/get-study-schedule-from-model.dto'



type QueryFilter = getStudyScheduleFromModelDtoType

export class StudyScheduleRepository implements IStudyScheduleRepository<QueryFilter, StudySchedule, unknown | StudySchedule>{

    constructor(@InjectRepository(StudySchedule) private userRepository: Repository<StudySchedule>) { }


    async getAll(filter?: QueryFilter): Promise<StudySchedule[]> {
        try {
            return this.userRepository.find();
        } catch (error) {
            console.log(error)
        }
    }
    async getByKey(filter: QueryFilter): Promise<StudySchedule[]> {
        try {
            const findOptionsCourse: FindOptionsWhere<StudySchedule> = {
                user: filter.user
            }
            return this.userRepository.findBy(findOptionsCourse);
        } catch (error) {
            console.log('HOUSTON WE HAVE A PROBLEM IN CourseRepository: ERROR: ', error)
        }
    }
    getInside?(filter: QueryFilter): Promise<StudySchedule[]> {
        throw new Error('Method not implemented.');
    }
    save(input: StudySchedule): Promise<StudySchedule> {
        try {
            const newStudySchedule = this.userRepository.create(input);
            return this.userRepository.save(newStudySchedule);
        } catch (error) {
            console.log(error)
        }
    }
}