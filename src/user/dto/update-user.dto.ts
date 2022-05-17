import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(2, 20)
  nickname?: string;

  @IsOptional()
  careerId?: number;

  @IsOptional()
  year?: string;

  @IsOptional()
  description?: string;
}
