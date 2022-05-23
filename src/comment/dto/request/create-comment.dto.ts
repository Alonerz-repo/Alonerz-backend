import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
