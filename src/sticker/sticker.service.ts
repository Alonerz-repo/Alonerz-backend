import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStickerDto } from './dto/request/create-sticker.dto';
import { CreatedStickerDto } from './dto/response/created-sticker.dto';
import { SelectStickersDto } from './dto/response/select-stickers.dto';
import { StickerException } from './sticker.exception';
import { StickerRepository } from './sticker.repository';
import { Sticker } from './sticker.entity';

@Injectable()
export class StickerService {
  constructor(
    @InjectRepository(StickerRepository)
    private readonly stickerRepository: StickerRepository,
    private readonly stickerException: StickerException,
  ) {}

  // 스티커 존재여부 확인
  private async getSticker(stickerId: number): Promise<Sticker> {
    const sticker = await this.stickerRepository.findOne({ stickerId });
    if (!sticker) {
      this.stickerException.NotFound();
    }
    return sticker;
  }

  // 사용자의 모든 스티커 조회
  async getStickers(userId: string): Promise<SelectStickersDto> {
    const stickers = await this.stickerRepository.getStickers(userId);
    return new SelectStickersDto(stickers);
  }

  // 스티커 저장(v2)
  async putSticker(
    userId: string,
    createStickerDto: CreateStickerDto,
  ): Promise<CreatedStickerDto> {
    const { stickerImageId, stickerOrder } = createStickerDto;
    const exist = await this.stickerRepository.findOne({
      userId,
      stickerOrder,
    });

    // 내일 맨정신으로 코드 수정해놓고
    // Repository 불필요한 코드 싹다 정리하고

    let sticker;
    if (exist) {
      const { stickerId } = exist;
      await this.stickerRepository.update(
        {
          stickerId,
          stickerOrder,
        },
        {
          stickerImageId,
        },
      );
      exist.stickerImageId = stickerImageId;
      sticker = exist;
    } else {
      sticker = await this.stickerRepository.save({
        userId,
        ...createStickerDto,
      });
    }
    return new CreatedStickerDto(sticker);
  }

  // 스티커 제거
  async deleteSticker(stickerId: number): Promise<void> {
    await this.getSticker(stickerId);
    await this.stickerRepository.deleteSticker(stickerId);
    return;
  }
}
