import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ required: true, example: '추가 인원 받으시나요?' })
  @IsNotEmpty()
  @IsString()
  content: string;
}

export class UpdateCommentDto {
  @ApiProperty({ required: true, example: '감사합니다!' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
