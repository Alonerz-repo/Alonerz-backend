import { EntityRepository, Repository } from 'typeorm';
import { CreateStickerDto } from './dto/request/create-sticker.dto';
import { UpdateStickerDto } from './dto/request/update-sticker.dto';
import { Sticker } from './sticker.entity';

@EntityRepository(Sticker)
export class StickerRepository extends Repository<Sticker> {
  // 사용자의 모든 스티커 조회
  async getStickers(userId: string) {
    return this.find({
      where: { userId },
      select: ['stickerId', 'stickerImageId', 'stickerOrder'],
      order: {
        stickerOrder: 'ASC',
      },
    });
  }

  // 스티커 입력
  async createSticker(
    userId: string,
    createStickerDto: CreateStickerDto,
  ): Promise<Sticker> {
    return await this.save({ userId, ...createStickerDto });
  }

  // 스티커 이미지 및 위치 변경
  async updateSticker(
    stickerId: number,
    updateStickerDto: UpdateStickerDto,
  ): Promise<void> {
    await this.update({ stickerId }, updateStickerDto);
  }

  // 스티커 제거
  async deleteSticker(stickerId: number): Promise<void> {
    await this.delete({ stickerId });
  }
}
