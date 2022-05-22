import { ApiResponseProperty } from '@nestjs/swagger';

export class CreatedStickerDto {
  @ApiResponseProperty()
  readonly stickerId: number;

  @ApiResponseProperty()
  readonly stickerUrl: string;

  @ApiResponseProperty()
  readonly stickerOrder: number;
}
