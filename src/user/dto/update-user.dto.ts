import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: '닉네임' })
  @IsOptional()
  @IsString()
  @Length(2, 20)
  nickname?: string;

  @ApiProperty({
    example:
      'https://postfiles.pstatic.net/MjAyMDAyMTBfODAg/MDAxNTgxMzA0MTE3ODMy.ACRLtB9v5NH-I2qjWrwiXLb7TeUiG442cJmcdzVum7cg.eTLpNg_n0rAS5sWOsofRrvBy0qZk_QcWSfUiIagTfd8g.JPEG.lattepain/1581304118739.jpg',
  })
  @IsOptional()
  @IsString()
  profileImageUrl?: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @IsNumber()
  careerId?: number;

  @ApiProperty({ example: '신입(1년차)' })
  @IsOptional()
  @IsString()
  year?: string;

  @ApiProperty({ example: '올해 입사한 주니어 백엔드 개발자입니다.' })
  @IsOptional()
  @IsString()
  description?: string;
}
