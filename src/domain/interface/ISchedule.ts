export const STUDY_SCHEDULE_REPOSITORY = 'STUDY_SCHEDULE_REPOSITORY';

import { ICommandGeneric } from './helper/ICommandGeneric';
import { IQueryGeneric } from './helper/iQueryGeneric';

export interface IStudyScheduleRepository<Key, Model, CommandResponse>
    extends IQueryGeneric<Key, Model>, ICommandGeneric<Key, Model, CommandResponse> {        
}