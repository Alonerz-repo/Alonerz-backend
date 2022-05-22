import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateStickerDto {
  @ApiProperty({ type: 'integer' })
  @IsOptional()
  @IsNumber()
  readonly stickerImageId?: number;

  @ApiProperty({ type: 'integer' })
  @IsOptional()
  @IsNumber()
  readonly order?: number;
}
