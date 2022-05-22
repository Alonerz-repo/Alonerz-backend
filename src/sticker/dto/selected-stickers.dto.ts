import { ApiResponseProperty } from '@nestjs/swagger';

class SelectedSticker {
  @ApiResponseProperty()
  readonly stickerId: number;

  @ApiResponseProperty()
  readonly stickerUrl: string;

  @ApiResponseProperty()
  readonly stickerOrder: number;
}

export class SelectedStickersDto {
  @ApiResponseProperty()
  readonly stickers: Array<SelectedSticker>;
}
