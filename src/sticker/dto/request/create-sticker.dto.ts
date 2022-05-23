import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateStickerDto {
  @ApiProperty({ type: 'integer' })
  @IsOptional()
  @IsNumber()
  readonly stickerId?: number;

  @ApiProperty({ type: 'integer' })
  @IsNumber()
  readonly stickerImageId: number;

  @ApiProperty({ type: 'integer' })
  @IsNumber()
  readonly stickerOrder: number;
}
