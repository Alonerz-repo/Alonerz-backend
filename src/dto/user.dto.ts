import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(2, 20)
  nickname?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  careerId?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  year?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;
}
