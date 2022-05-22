import { Sticker } from 'src/sticker/sticker.entity';
import { ApiResponseProperty } from '@nestjs/swagger';

export class SelectStickerDto {
  @ApiResponseProperty()
  stickerId: number;

  @ApiResponseProperty()
  stickerImageId: number;

  @ApiResponseProperty()
  stickerOrder: number;
}

export class SelectStickersDto {
  @ApiResponseProperty()
  stickers: Array<SelectStickerDto>;

  constructor(stickers: Array<Sticker>) {
    this.stickers = stickers.map((sticker: Sticker) => {
      const { stickerId, stickerImageId, stickerOrder } = sticker;
      return {
        stickerId,
        stickerImageId,
        stickerOrder,
      };
    });
  }
}
