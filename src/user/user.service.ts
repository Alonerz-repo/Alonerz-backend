import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlockRepository } from 'src/block/block.repository';
import { ImageRepository } from 'src/image/image.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserInfoRow } from './row/user-info.row';
import { UserException } from './user.exception';
import { UserRepository } from './user.repository';
import { Connection } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(ImageRepository)
    private imageRepository: ImageRepository,
    @InjectRepository(BlockRepository)
    private blockRepository: BlockRepository,
    private connection: Connection,
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

  // 사용자 프로필 조회
  async getUserProfile(userId: string, otherId: string) {
    const user: UserInfoRow = await this.userRepository.findUserInfo(otherId);

    if (!user) {
      this.userException.NotFoundUser();
    }

    if (userId !== otherId) {
      const myBlocks = await this.blockRepository.findBlockUserId(userId);
      const myBlockIds = myBlocks.map((user: any) => user.otherId.userId);

      // 내가 해당 계정을 차단한 경우
      if (myBlockIds.includes(otherId)) {
        return this.userException.BlockedUser();
      }

      const otherBlocks = await this.blockRepository.findBlockUserId(otherId);
      const otherBlockIds = otherBlocks.map((user: any) => user.otherId.userId);

      // 내가 차단당한 경우
      if (otherBlockIds.includes(userId)) {
        return this.userException.IwasBlocked();
      }
    }

    const followers = user.follower as [];
    user.followers = followers.map((other: any) => other.userId.userId);
    user.follower = user.followers.length;

    const following = user.following as [];
    user.following = following.length;

    const point = user.point as [];
    user.point = point.reduce((pre: number, point: { point: number }) => {
      return pre + point.point;
    }, 0);

    return { user };
  }

  // 사용자 프로필 수정
  async updateMyProfile(
    userId: string,
    image: Express.MulterS3.File,
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    const { nickname } = updateUserDto;
    await this.findUserByNickname(userId, nickname);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let error = null;
    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await this.imageRepository.uploadImageTransaction(
          queryRunner,
          image,
        );
      }
      await this.userRepository.updateUserProfileTransaction(
        queryRunner,
        userId,
        imageUrl,
        updateUserDto,
      );
      await queryRunner.commitTransaction();
    } catch (e) {
      error = e;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    if (error) {
      this.userException.Transaction();
    }
  }
}
