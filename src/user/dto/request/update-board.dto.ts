import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateBoardDto {
  @ApiProperty({ type: 'integer' })
  @IsOptional()
  @IsNumber()
  readonly characterImageId?: number;

  @ApiProperty({ type: 'integer' })
  @IsOptional()
  @IsNumber()
  readonly backgroundColorId?: number;
}
