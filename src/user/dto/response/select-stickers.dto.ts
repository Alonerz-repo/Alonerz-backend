import { Sticker } from 'src/sticker/sticker.entity';
import { StickerDto } from './sticker.dto';
import { ApiResponseProperty } from '@nestjs/swagger';

export class SelectStickersDto {
  @ApiResponseProperty()
  stickers: StickerDto[];

  constructor(stickers: Sticker[]) {
    this.stickers = stickers.map((sticker: Sticker) => new StickerDto(sticker));
  }
}
