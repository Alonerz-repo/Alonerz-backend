import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockRepository } from 'src/block/block.repository';
import { UserException } from './user.exception';
import { UserRepository } from './user.repository';
import { UpdateProfileDto } from './dto/request/update-profile.dto';
import { SelectProfileDto } from './dto/response/select-profile.dto';
import { SelectUserDto } from './dto/response/select-user.dto';
import { SelectBoardDto } from './dto/response/select-board.dto';
import { UpdatedProfileImageDto } from './dto/response/updated-profile-image.dto';
import { UpdateBoardDto } from './dto/request/update-board.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(BlockRepository)
    private blockRepository: BlockRepository,
    private userException: UserException,
  ) {}

  // 닉네임 중복성 검사
  private async findUserByNickname(userId: string, nickname: string) {
    const user = await this.userRepository.findOne({ nickname });
    if (user && user.userId !== userId) {
      this.userException.AlreadyUsedNickname();
    }
    return user;
  }

  // 차단 관계 확인
  private async checkBlockRelation(userId: string, otherId: string) {
    const myBlocks = await this.blockRepository.findBlockUserId(userId);
    const myBlockIds = myBlocks.map((user: any) => user.otherId.userId);

    // 내가 해당 계정을 차단한 경우
    if (myBlockIds.includes(otherId)) {
      this.userException.BlockedUser();
    }

    const otherBlocks = await this.blockRepository.findBlockUserId(otherId);
    const otherBlockIds = otherBlocks.map((user: any) => user.otherId.userId);

    // 내가 차단당한 경우
    if (otherBlockIds.includes(userId)) {
      this.userException.IwasBlocked();
    }
  }

  // 사용자 프로필 조회
  async getUser(userId: string, otherId: string): Promise<SelectUserDto> {
    const user = await this.userRepository.selectUserMain(otherId);
    if (!user) {
      this.userException.NotFoundUser();
    }
    this.checkBlockRelation(userId, otherId);
    return new SelectUserDto(userId, user);
  }

  // 사용자 프로필(프로필 사진, 닉네임, 전문분야, 경력, 한 줄 소개) 조회
  async getProfile(userId: string): Promise<SelectProfileDto> {
    const user = await this.userRepository.selectUserProfile(userId);
    return new SelectProfileDto(user);
  }

  // 사용자 보드(스티커, 캐릭터, 배경색)
  async getBoard(userId: string): Promise<SelectBoardDto> {
    const user = await this.userRepository.selectBoard(userId);
    return new SelectBoardDto(user);
  }

  // 사용자 프로필 수정
  async updateProfile(
    userId: string,
    updateProfileInfoDto: UpdateProfileDto,
  ): Promise<void> {
    const { nickname } = updateProfileInfoDto;
    await this.findUserByNickname(userId, nickname);
    await this.userRepository.updateProfile(userId, updateProfileInfoDto);
    return;
  }

  // 사용자 프로필 이미지 수정
  async updateProfileImage(
    userId: string,
    image: Express.MulterS3.File,
  ): Promise<UpdatedProfileImageDto> {
    if (!image) {
      this.userException.NotImage();
    }
    const profileImageUrl = await this.userRepository.updateProfileImage(
      userId,
      image,
    );
    return new UpdatedProfileImageDto(profileImageUrl);
  }

  // 사용자 프로필 이미지 삭제
  async deleteProfileImage(userId: string): Promise<void> {
    await this.userRepository.deleteProfileImage(userId);
    return;
  }

  // 사용자 보드(캐릭터, 배경색) 수정
  async updateBoard(
    userId: string,
    updateBoardDto: UpdateBoardDto,
  ): Promise<void> {
    await this.userRepository.updateBoard(userId, updateBoardDto);
  }
}
