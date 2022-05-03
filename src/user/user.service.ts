import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserException } from './user.exception';
import { UserRepository } from './user.repository';
import { Career } from './career.entity';
import { CareerRepository } from './career.repository';
import { CreateCareerDto } from './dto/create.career.dto';
import { UpdateCareerDto } from './dto/update.career.dto';
import { CareerException } from './career.exception';
import { KakaoAccount, KakaoAccountAPI } from 'src/common/interfaces';
import { configs } from 'src/common/configs';
import axios from 'axios';
import { KakaoUser } from './dto/kakao.user.dto';

const { adminKey } = configs.kakao;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private careerRepository: CareerRepository,
    private userException: UserException,
    private careerException: CareerException,
  ) {}

  // Kakao 사용자 정보 조회 API
  private async kakaoGetUserAPI(kakaoId: string): Promise<KakaoAccountAPI> {
    const host = 'https://kapi.kakao.com/v2/user/me';
    const url = `${host}?target_id_type=user_id&target_id=${kakaoId}`;
    const headers = {
      Authorization: `KakaoAK ${adminKey}`,
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    const response = await axios.get(url, { headers });
    const data: KakaoAccount = response.data;
    const { kakao_account, connected_at } = data;
    const { profile, gender } = kakao_account;
    return {
      kakaoId,
      nickname: profile.nickname,
      gender: gender ? gender : null,
      profileImageUrl: profile.profile_image_url,
      thumbnailImageUrl: profile.thumbnail_image_url,
      connectedAt: connected_at,
    };
  }

  // 사용자 정보 조회
  public async userInfo(kakaoId: string): Promise<KakaoUser> {
    const user = await this.userRepository.findUserByKakaoId(kakaoId);
    if (!user) this.userException.notFound();
    if (user.deletedAt) this.userException.forbidden();
    const kakaoAccount = await this.kakaoGetUserAPI(kakaoId);
    delete user.createdAt;
    delete user.updatedAt;
    delete user.deletedAt;
    return {
      ...user,
      ...kakaoAccount,
    };
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
