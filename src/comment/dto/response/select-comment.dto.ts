import { ApiResponseProperty } from '@nestjs/swagger';
import { Comment } from 'src/comment/comment.entity';
import { CommentUserDto } from './comment-user.dto';

export class SelectCommentDto {
  @ApiResponseProperty()
  commentId: number;

  @ApiResponseProperty()
  childCommentCount?: number;

  @ApiResponseProperty()
  content: string;

  @ApiResponseProperty()
  createdAt: Date;

  @ApiResponseProperty()
  updatedAt: Date;

  @ApiResponseProperty()
  user: CommentUserDto;

  constructor(comment: Comment) {
    const {
      commentId,
      parentId,
      childCommentCount,
      content,
      createdAt,
      updatedAt,
      userId,
    } = comment;
    this.commentId = commentId;
    if (!parentId) {
      this.childCommentCount = childCommentCount;
    }
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = userId as unknown as CommentUserDto;
  }
}
