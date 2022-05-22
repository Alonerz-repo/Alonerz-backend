import { ApiResponseProperty } from '@nestjs/swagger';

export class DeletedStickerDto {
  @ApiResponseProperty()
  readonly stickerId: number;
}
