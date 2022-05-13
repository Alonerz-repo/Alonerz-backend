import { EntityRepository, Repository } from 'typeorm';
import { GroupUser } from './groupuser.entity';

@EntityRepository(GroupUser)
export class GroupUserRepository extends Repository<GroupUser> {}
