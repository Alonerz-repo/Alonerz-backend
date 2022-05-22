import { ApiResponseProperty } from '@nestjs/swagger';

export class CreateStickerDto {
  @ApiResponseProperty()
  stickerId: number;

  @ApiResponseProperty()
  stickerUrl: string;

  @ApiResponseProperty()
  stickerOrder: number;
}
