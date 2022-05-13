import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

const messages = {
  content: '댓글 내용을 입력하세요.',
};

export class CreateCommentDto {
  @ApiProperty({ example: '' })
  @IsNotEmpty({ message: messages.content })
  @IsString({ message: messages.content })
  content: string;
}
