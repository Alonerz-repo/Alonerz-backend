import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
