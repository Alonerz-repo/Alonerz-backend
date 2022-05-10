import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payload } from 'src/common/interface';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getMyProfile(payload: Payload) {
    const { userId, kakaoId, nickname } = payload;
    const user = await this.userRepository
      .createQueryBuilder('users')
      .where('users.userId = :userId', { userId })
      .andWhere('users.kakaoId = :kakaoId', { kakaoId })
      .andWhere('users.nickname = :nickname', { nickname })
      .andWhere('users.deletedAt IS NULL')
      .leftJoinAndSelect('users.career', 'career')
      .leftJoinAndSelect('users.point', 'point')
      .getOne();
    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['사용자 정보를 찾을 수 없습니다.'],
        error: 'NotFound',
      });
    }
    return { user };
  }

  async getOtherProfile(userId: number) {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .where('users.userId = :userId', { userId })
      .leftJoinAndSelect('users.career', 'career')
      .leftJoinAndSelect('users.point', 'point')
      .getOne();
    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: ['사용자 정보를 찾을 수 없습니다.'],
        error: 'NotFound',
      });
    }
    return { user };
  }
}
