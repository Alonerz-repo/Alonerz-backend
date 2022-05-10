import {
  ConflictException,
  HttpStatus,
  ImATeapotException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/dto/user.dto';
import { Career } from 'src/entity/career.entity';
import { UserBlock } from 'src/entity/user-block.entity';
import { UserFollow } from 'src/entity/user-follow.entity';
import { User } from 'src/entity/user.entity';
import { Connection, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Career)
    private careerRepository: Repository<Career>,
    @InjectRepository(UserFollow)
    private followRepository: Repository<UserFollow>,
    @InjectRepository(UserBlock)
    private blockRepository: Repository<UserBlock>,
    private connection: Connection,
  ) {}

  // 사용자 정보 조회
  private async findUserByUserId(userId: number) {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .select([
        'users.userId AS userId',
        'users.nickname AS nickname',
        'users.profileImageUrl AS profileImageUrl',
        'users.year AS year',
        'users.description AS description',
      ])
      .leftJoin('users.career', 'career')
      .addSelect([
        'career.careerId AS careerId',
        'career.careerGroupName AS careerGroupName',
        'career.careerItemName AS careerItemName',
      ])
      .leftJoin('users.following', 'following')
      .addSelect(
        (queryBuilder) =>
          queryBuilder
            .select('COUNT(follows.userId)')
            .from('user_follows', 'follows')
            .where('follows.userId = :userId', { userId }),
        'following',
      )
      .addSelect(
        (queryBuilder) =>
          queryBuilder
            .select('COUNT(follows.userId)')
            .from('user_follows', 'follows')
            .where('follows.followUserId = :userId', { userId }),
        'follower',
      )
      .leftJoin('users.point', 'points')
      .addSelect(
        (queryBuilder) =>
          queryBuilder
            .select(
              'CASE\
                WHEN SUM(points.point) IS NULL THEN 0\
                ELSE SUM(points.point)\
              END',
            )
            .from('user_points', 'points')
            .where('points.userId = :userId', { userId }),
        'point',
      )
      .where('users.userId = :userId', { userId })
      .groupBy('users.userId')
      .getRawOne();

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['사용자 정보를 찾을 수 없습니다.'],
        error: 'Not Found',
      });
    }

    return { user };
  }

  // 닉네임 중복성 검사용
  private async findUserByNickname(nickname: string) {
    const user = await this.userRepository.findOne({ nickname });
    if (user) {
      throw new ConflictException({
        statusCode: HttpStatus.CONFLICT,
        message: ['누군가 사용중인 닉네임입니다.'],
        error: 'Conflict',
      });
    }
  }

  // 특정 직업/직군 조회
  private async findCareerByCareerId(careerId: number) {
    const career = await this.careerRepository.findOne({ careerId });
    if (!career) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['직군/직업 정보를 찾을 수 없습니다.'],
        error: 'Not Found',
      });
    }
    return career;
  }

  // 사용자 프로필 조회
  async findUserProfile(userId: number) {
    return await this.findUserByUserId(userId);
  }

  // 사용자 팔로잉 목록 조회
  async findUserFollowings(userId: number) {
    const users = await this.followRepository
      .createQueryBuilder('user_follows')
      .select(['user_follows.userId AS userId'])
      .leftJoin('user_follows.followUserId', 'users')
      .addSelect([
        'users.userId AS userId',
        'users.nickname AS nickname',
        'users.profileImageUrl AS profileImageUrl',
        'users.year AS year',
        'users.description AS description',
      ])
      .leftJoin('users.career', 'career')
      .addSelect([
        'career.careerId AS careerId',
        'career.careerGroupName AS careerGroupName',
        'career.careerItemName AS careerItemName',
      ])
      .leftJoin('users.point', 'points')
      .addSelect(
        (queryBuilder) =>
          queryBuilder
            .select(
              'CASE\
                WHEN SUM(points.point) IS NULL THEN 0\
                ELSE SUM(points.point)\
              END',
            )
            .from('user_points', 'points')
            .where('points.userId = users.userId'),
        'point',
      )
      .where('user_follows.userId = :userId', { userId })
      .groupBy('users.userId')
      .getRawMany();

    return { users };
  }

  // 사용자 팔로워 목록 조회
  async findUserFollowers(userId: number) {
    const users = await this.followRepository
      .createQueryBuilder('user_follows')
      .select(['user_follows.followUserId AS userId'])
      .leftJoin('user_follows.userId', 'users')
      .addSelect([
        'users.userId AS userId',
        'users.nickname AS nickname',
        'users.profileImageUrl AS profileImageUrl',
        'users.year AS year',
        'users.description AS description',
      ])
      .leftJoin('users.career', 'career')
      .addSelect([
        'career.careerId AS careerId',
        'career.careerGroupName AS careerGroupName',
        'career.careerItemName AS careerItemName',
      ])
      .leftJoin('users.point', 'points')
      .addSelect(
        (queryBuilder) =>
          queryBuilder
            .select(
              'CASE\
                WHEN SUM(points.point) IS NULL THEN 0\
                ELSE SUM(points.point)\
              END',
            )
            .from('user_points', 'points')
            .where('points.userId = users.userId'),
        'point',
      )
      .where('user_follows.followUserId = :userId', { userId })
      .groupBy('users.userId')
      .getRawMany();

    return { users };
  }

  // 나의 차단 목록 조회
  async getMyBlockings(userId: number) {
    const users = await this.blockRepository
      .createQueryBuilder('user_blocks')
      .select(['user_blocks.userId AS userId'])
      .leftJoin('user_blocks.blockUserId', 'users')
      .addSelect([
        'users.userId AS userId',
        'users.nickname AS nickname',
        'users.profileImageUrl AS profileImageUrl',
        'users.year AS year',
        'users.description AS description',
      ])
      .leftJoin('users.career', 'career')
      .addSelect([
        'career.careerId AS careerId',
        'career.careerGroupName AS careerGroupName',
        'career.careerItemName AS careerItemName',
      ])
      .leftJoin('users.point', 'points')
      .addSelect(
        (queryBuilder) =>
          queryBuilder
            .select(
              'CASE\
                WHEN SUM(points.point) IS NULL THEN 0\
                ELSE SUM(points.point)\
              END',
            )
            .from('user_points', 'points')
            .where('points.userId = users.userId'),
        'point',
      )
      .where('user_blocks.userId = :userId', { userId })
      .groupBy('users.userId')
      .getRawMany();

    return { users };
  }

  // 사용자 프로필 수정
  async updateMyProfile(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    const { user } = await this.findUserByUserId(userId);
    const { nickname, profileImageUrl, careerId, year, description } =
      updateUserDto;

    // 닉네임 중복 검사
    if (nickname && nickname !== user.nickname) {
      await this.findUserByNickname(nickname);
    }

    // 커리어 정보 수정
    if (careerId) {
      const career = await this.findCareerByCareerId(careerId);
      await this.userRepository.update(
        { userId },
        { nickname, profileImageUrl, year, description, career },
      );
    } else {
      await this.userRepository.update(
        { userId },
        { nickname, profileImageUrl, year, description },
      );
    }
  }

  // 다른 사용자 팔로잉/취소
  async followingOtherOrCancel(
    userId: number,
    followUserId: number,
  ): Promise<void> {
    const user = await (await this.findUserByUserId(userId)).user;
    const followUser = await (await this.findUserByUserId(followUserId)).user;

    if (user.userId === followUser.userId) {
      throw new ImATeapotException({
        statusCode: HttpStatus.I_AM_A_TEAPOT,
        message: [
          '자기 자신을 팔로우하다뇨?',
          '너무 지치신 모양인 듯 하네요.',
          '커피 한 잔 하고 오세요.',
        ],
        error: 'I am a Teapot',
      });
    }

    const follow = await this.followRepository.findOne({
      userId,
      followUserId,
    });

    if (follow) {
      await this.followRepository.delete({ id: follow.id });
    } else {
      await this.followRepository.save({
        userId: user,
        followUserId: followUser,
      });
    }
  }

  // 다른 사용자 차단/취소
  async blockOtherOrCancel(userId: number, blockUserId: number): Promise<void> {
    const user = (await this.findUserByUserId(userId)).user;
    const blockUser = (await this.findUserByUserId(blockUserId)).user;

    if (user.userId === blockUser.userId) {
      throw new ImATeapotException({
        statusCode: HttpStatus.I_AM_A_TEAPOT,
        message: [
          '자기 자신을 차단하다뇨?',
          '너무 지치신 모양인 듯 하네요.',
          '커피 한 잔 하고 오세요.',
        ],
        error: 'I am a Teapot',
      });
    }

    const block = await this.blockRepository.findOne({
      userId: userId,
      blockUserId: blockUserId,
    });

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let error = null;
    try {
      // 팔로우 상태까지 해제
      if (block) {
        await queryRunner.manager.delete(UserBlock, { id: block.id });
      } else {
        await queryRunner.manager.save(UserBlock, {
          userId: user,
          blockUserId: blockUser,
        });
        await queryRunner.manager.delete(UserFollow, {
          userId: userId,
          followUserId: blockUserId,
        });
        await queryRunner.manager.delete(UserFollow, {
          userId: blockUserId,
          followUserId: userId,
        });
      }
      await queryRunner.commitTransaction();
    } catch (e) {
      error = e;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    if (error) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: ['처리 중에 예기치 않은 오류가 발생하였습니다.'],
        error: 'Internal Server Error',
      });
    }
  }
}
