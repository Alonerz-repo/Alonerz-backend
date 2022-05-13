import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';
import { UserProperty } from 'src/common/swagger/property/user.property';

export class UpdateUserDto {
  @ApiProperty(UserProperty.nickname)
  @IsOptional()
  @IsString()
  @Length(2, 20)
  nickname?: string;

  @ApiProperty(UserProperty.profileImageUrl)
  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @ApiProperty(UserProperty.careerId)
  @IsOptional()
  @IsNumber()
  careerId?: number;

  @ApiProperty(UserProperty.year)
  @IsOptional()
  @IsString()
  year?: string;

  @ApiProperty(UserProperty.description)
  @IsOptional()
  @IsString()
  description?: string;
}
