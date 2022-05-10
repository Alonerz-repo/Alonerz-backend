import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(2, 20)
  nickname?: string;

  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @IsOptional()
  @IsNumber()
  careerId?: number;

  @IsOptional()
  @IsString()
  year?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
