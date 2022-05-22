import { Sticker } from 'src/sticker/sticker.entity';
import { SelectStickerDto } from './select-sticker.dto';
import { ApiResponseProperty } from '@nestjs/swagger';

export class SelectStickersDto {
  @ApiResponseProperty()
  stickers: SelectStickerDto[];

  constructor(stickers: Sticker[]) {
    this.stickers = stickers.map(
      (sticker: Sticker) => new SelectStickerDto(sticker),
    );
  }
}
