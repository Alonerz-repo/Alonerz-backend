import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @Length(2, 20)
  nickname: string;

  @ApiProperty({ type: 'integer' })
  @IsNumber()
  careerId: number;

  @ApiProperty({ type: 'integer' })
  @IsNumber()
  yearId: number;

  @ApiProperty({ type: 'string', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
