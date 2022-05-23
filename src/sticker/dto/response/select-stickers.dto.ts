import { Sticker } from 'src/sticker/sticker.entity';
import { SelectStickerDto } from './select-sticker.dto';
import { ApiResponseProperty } from '@nestjs/swagger';

export class SelectStickersDto {
  @ApiResponseProperty()
  readonly stickers: SelectStickerDto[];

  constructor(stickers: Sticker[]) {
    this.stickers = stickers.map((sticker) => new SelectStickerDto(sticker));
  }
}
