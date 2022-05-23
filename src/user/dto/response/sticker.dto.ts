import { Sticker } from 'src/sticker/sticker.entity';
import { ApiResponseProperty } from '@nestjs/swagger';

export class StickerDto {
  @ApiResponseProperty()
  stickerId: number;

  @ApiResponseProperty()
  stickerImageId: number;

  @ApiResponseProperty()
  stickerOrder: number;

  constructor(sticker: Sticker) {
    this.stickerId = sticker.stickerId;
    this.stickerImageId = sticker.stickerImageId;
    this.stickerOrder = sticker.stickerOrder;
  }
}
