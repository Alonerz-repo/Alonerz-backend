import { User } from 'src/user/user.entity';
import { SelectStickersDto } from './select-stickers.dto';
import { ApiResponseProperty } from '@nestjs/swagger';
import { SelectStickerDto } from 'src/sticker/dto/response/select-sticker.dto';

class BoardDto {
  @ApiResponseProperty()
  userId: string;

  @ApiResponseProperty()
  characterImageId: number;

  @ApiResponseProperty()
  backgroundColorId: number;

  @ApiResponseProperty()
  stickers: SelectStickerDto[];
}

export class SelectBoardDto {
  @ApiResponseProperty()
  user: BoardDto;

  constructor(user: User) {
    this.user = {
      userId: user.userId,
      characterImageId: user.characterImageId,
      backgroundColorId: user.backgroundColorId,
      ...new SelectStickersDto(user.stickers),
    };
  }
}
