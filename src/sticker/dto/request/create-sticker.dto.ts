import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateStickerDto {
  @ApiProperty({ type: 'integer' })
  @IsNumber()
  readonly stickerImageId: number;

  @ApiProperty({ type: 'integer' })
  @IsNumber()
  readonly stickerOrder: number;
}
