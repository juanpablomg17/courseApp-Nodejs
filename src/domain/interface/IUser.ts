export const USER_REPOSITORY = 'USER_REPOSITORY';

import { ICommandGeneric } from './helper/ICommandGeneric';
import { IQueryGeneric } from './helper/iQueryGeneric';

export interface IUserRepository<Key, Model, CommandResponse>
    extends IQueryGeneric<Key, Model>, ICommandGeneric<Key, Model, CommandResponse> {        
}