import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class KakaoLoginDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  readonly kakaoId: string;
}
