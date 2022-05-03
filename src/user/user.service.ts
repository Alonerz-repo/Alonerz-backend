import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserException } from './user.exception';
import { UserRepository } from './user.repository';
import { Career } from './career.entity';
import { CareerRepository } from './career.repository';
import { CreateCareerDto } from './dto/create.career.dto';
import { UpdateCareerDto } from './dto/update.career.dto';
import { CareerException } from './career.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private careerRepository: CareerRepository,
    private userException: UserException,
    private careerException: CareerException,
  ) {}

  // 내 정보 조회
  public async me(kakaoId: string): Promise<User> {
    const user = await this.userRepository.findUserByKakaoId(kakaoId);
    if (!user) this.userException.notFound();
    return user;
  }

  // 사용자 커리어 개수 파악
  private async countCareer(kakaoId: string): Promise<number> {
    const career = await this.careerRepository.findAllCareerByKakaoId(kakaoId);
    if (career.length >= 2) this.careerException.tooLarge();
    return career.length;
  }

  // 사용자 특정 커리어 조회
  private async findCareer(kakaoId: string, careerId: number): Promise<any> {
    const career = await this.careerRepository.findCareerByKakaoIdAndCareerId(
      kakaoId,
      careerId,
    );
    if (!career) this.careerException.notFound();
    return career;
  }

  // 사용자 커리어 추가(최대 2개까지만)
  public async createCareer(
    kakaoId: string,
    createCareerDto: CreateCareerDto,
  ): Promise<Career> {
    await this.countCareer(kakaoId);
    return await this.careerRepository.createCareer(kakaoId, createCareerDto);
  }

  // 사용자 커리어 수정
  public async updateCareer(
    kakaoId: string,
    careerId: number,
    updateCareerDto: UpdateCareerDto,
  ): Promise<void> {
    await this.findCareer(kakaoId, careerId);
    await this.careerRepository.updateCareer(careerId, updateCareerDto);
  }

  // 사용자 커리어 삭제
  public async deleteCareer(kakaoId: string, careerId: number): Promise<void> {
    await this.findCareer(kakaoId, careerId);
    await this.careerRepository.deleteCareer(careerId);
  }
}
