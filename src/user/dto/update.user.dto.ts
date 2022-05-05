import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  public nickname?: string;

  @IsOptional()
  @IsString()
  public profileImageUrl?: string;
}
