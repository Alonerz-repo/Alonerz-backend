import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReissueTokneDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  readonly refreshToken: string;
}
