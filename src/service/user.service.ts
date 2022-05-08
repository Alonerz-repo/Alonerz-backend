import { UpdateUserDto } from '../common/dto/user.dto';
import { UserPoint } from '../entity/user-point.entity';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

export const findUser = async (userId: number) => {
  let user: User;
  try {
    /* 
      select *, (
        select SUM(point) from user_points
        where userIdUserId = users.userId
      ) as point from users
      left join careers
        on users.career = careers.careerId
      where userId = 1;
    */

    /*
      SELECT users.*, careers.*, SUM(user_points.point) 
        FROM users 
      LEFT JOIN careers 
        ON careers.careerId=users.career 
      LEFT JOIN user_points 
        ON user_points.userId=users.userId 
      WHERE users.userId = 1 AND users.deletedAt IS NULL;
    */
    // 포인트 조회 해결 해야함.
    user = await UserRepository.createQueryBuilder('users')
      .where('users.userId = :userId', { userId })
      .andWhere('users.deletedAt IS NULL')
      .leftJoinAndSelect('users.career', 'career')
      .leftJoinAndSelect(
        'SUM(users.point.point)',
        'point',
        'point.deletedAt IS NULL'
      )
      .getOne();

    if (!user) {
      throw {
        statusCode: 404,
        error: 'not found',
        message: '삭제되었거나 존재하지 않는 사용자입니다.',
      };
    }
  } catch (error) {
    throw {
      statusCode: 500,
      error: error,
      message: error.message,
    };
  }
  console.log(user);
  return user;
};

export const updateUserNickname = async (userId: number, nickname: string) => {
  const user = await UserRepository.findOneBy({ nickname });
  if (user) {
    throw {
      statusCode: 409,
      error: 'conflict',
      message: '이미 사용중인 닉네임입니다.',
    };
  }
  await UserRepository.update({ userId }, { nickname });
};

export const updateUser = async (
  userId: number,
  updateUserDto: UpdateUserDto
) => {
  await findUser(userId);
  // const { nickname, career } = updateUserDto;
  await UserRepository.update({ userId, deletedAt: null }, updateUserDto);
};
