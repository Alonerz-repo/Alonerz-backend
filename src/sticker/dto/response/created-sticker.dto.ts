import { Sticker } from 'src/sticker/sticker.entity';
import { SelectStickerDto } from './select-sticker.dto';
import { ApiResponseProperty } from '@nestjs/swagger';

export class CreatedStickerDto {
  @ApiResponseProperty()
  sticker: SelectStickerDto;

  constructor(sticker: Sticker) {
    this.sticker = {
      stickerId: sticker.stickerId,
      stickerImageId: sticker.stickerImageId,
      stickerOrder: sticker.stickerOrder,
    };
  }
}
