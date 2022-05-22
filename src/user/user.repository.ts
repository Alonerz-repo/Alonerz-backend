import {
  selectStickers,
  selectUserBoard,
  selectUserMain,
  selectUserProfile,
} from './select/selectUsers';
import { User } from './user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UpdateBoardDto } from './dto/request/update-board.dto';
import { UpdateProfileDto } from './dto/request/update-profile.dto';
import { UpdateProfileImageDto } from './dto/request/update-profile-image.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // 계정 생성
  async createUser(kakaoId: string) {
    return await this.save({ kakaoId });
  }

  // 사용자 메인 정보 조회
  async selectUserMain(userId: string): Promise<User> {
    return await this.createQueryBuilder('users')
      .select(selectUserMain)
      .leftJoin('users.stickers', 'sticker')
      .addSelect(selectStickers)
      .leftJoinAndSelect('users.followingUserIds', 'followingUserIds')
      .leftJoinAndSelect('users.followerUserIds', 'followerUserIds')
      .leftJoinAndSelect('followerUserIds.userId', 'followerUser')
      .leftJoin('users.point', 'points')
      .addSelect(['points.point'])
      .where('users.userId = :userId', { userId })
      .getOne();
  }

  // 사용자 스티커, 캐릭터, 배경 정보 조회
  async selectBoard(userId: string): Promise<User> {
    return await this.createQueryBuilder('users')
      .select(selectUserBoard)
      .leftJoin('users.stickers', 'sticker')
      .addSelect(selectStickers)
      .leftJoin('users.point', 'points')
      .addSelect(['points.point'])
      .where('users.userId = :userId', { userId })
      .getOne();
  }

  // 사용자 프로필(프로필 이미지, 닉네임, 커리어, 연차, 한 줄 소개) 조회
  async selectUserProfile(userId: string): Promise<User> {
    return await this.createQueryBuilder('users')
      .select(selectUserProfile)
      .leftJoin('users.point', 'points')
      .addSelect(['points.point'])
      .where('users.userId = :userId', { userId })
      .getOne();
  }

  // 사용자 프로필 정보 수정
  async updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<void> {
    await this.update({ userId }, updateProfileDto);
    return;
  }

  // 사용자 프로필 이미지 수정
  async updateProfileImage(
    userId: string,
    image: Express.MulterS3.File,
  ): Promise<string> {
    console.log(image);
    const profileImageUrl = image.location;
    await this.update({ userId }, { profileImageUrl });
    return profileImageUrl;
  }

  // 사용자 프로필 이미지 삭제
  async deleteProfileImage(userId: string): Promise<void> {
    await this.update({ userId }, { profileImageUrl: null });
    return;
  }

  // 사용자 보드(캐릭터, 배경색) 수정
  async updateBoard(
    userId: string,
    updateBoardDto: UpdateBoardDto,
  ): Promise<void> {
    await this.update({ userId }, updateBoardDto);
    return;
  }
}
