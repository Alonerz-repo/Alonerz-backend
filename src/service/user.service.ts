import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/dto/user.dto';
import { Career } from 'src/entity/career.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Career)
    private careerRepository: Repository<Career>,
  ) {}

  private async findUserByUserId(userId: number) {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .where('users.userId = :userId', { userId })
      .andWhere('users.deletedAt IS NULL')
      .leftJoinAndSelect('users.career', 'career')
      .leftJoinAndSelect('users.point', 'point')
      .getOne();
    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: ['사용자 정보를 찾을 수 없습니다.'],
        error: 'Not Found',
      });
    }
    return { user };
  }

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

  async findUserProfile(userId: number) {
    return await this.findUserByUserId(userId);
  }

  async updateMyProfile(userId: number, updateUserDto: UpdateUserDto) {
    const { user } = await this.findUserByUserId(userId);
    const { nickname, profileImageUrl, careerId, year, description } =
      updateUserDto;

    if (nickname && nickname !== user.nickname) {
      await this.findUserByNickname(nickname);
    }

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
}
