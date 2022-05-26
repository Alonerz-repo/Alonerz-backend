import { ApiResponseProperty } from '@nestjs/swagger';
import { Comment } from 'src/comment/comment.entity';
import { SelectCommentDto } from './select-comment.dto';

export class SelectCommentsDto {
  @ApiResponseProperty()
  comments: SelectCommentDto[];

  constructor(comments: Comment[]) {
    console.log(comments);
    this.comments = comments.map((comment) => new SelectCommentDto(comment));
  }
}
