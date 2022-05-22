import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateStickerDto {
  @ApiProperty({ type: 'integer' })
  @IsString()
  readonly stickerImageId: number;

  @ApiProperty({ type: 'integer' })
  @IsNumber()
  readonly stickerOrder: number;
}
