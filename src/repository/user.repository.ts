import { AppDataSource } from '../data-source';
import { UserBlock } from '../entity/user-block.entity';
import { UserCareer } from '../entity/user-career.entity';
import { UserFollow } from '../entity/user-follow.entity';
import { UserPoint } from '../entity/user-point.entity';
import { UserToken } from '../entity/user-token.entity';
import { User } from '../entity/user.entity';

export const UserRepository = AppDataSource.getRepository(User);
export const UserTokenRepository = AppDataSource.getRepository(UserToken);
export const UserCareerRepository = AppDataSource.getRepository(UserCareer);
export const UserPointRepository = AppDataSource.getRepository(UserPoint);
export const UserFollowRepository = AppDataSource.getRepository(UserFollow);
export const UserBlockRepository = AppDataSource.getRepository(UserBlock);
