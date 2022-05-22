import { ApiResponseProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdatedStickerDto {
  @ApiResponseProperty()
  readonly stickerId: number;

  @IsOptional()
  @ApiResponseProperty()
  readonly stickerUrl?: string;

  @IsOptional()
  @ApiResponseProperty()
  readonly stickerOrder?: number;
}
