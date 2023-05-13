export const COURSE_REPOSITORY = 'COURSE_REPOSITORY';

import { ICommandGeneric } from './helper/ICommandGeneric';
import { IQueryGeneric } from './helper/iQueryGeneric';

export interface ICourseRepository<Key, Model, CommandResponse>
    extends IQueryGeneric<Key, Model>, ICommandGeneric<Key, Model, CommandResponse> {        
}