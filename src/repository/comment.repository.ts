import { CreateCommentDto, UpdateCommentDto } from 'src/dto/comment.dto';
import { Comment } from 'src/entity/comment.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  // 그룹 댓글 작성
  async createGroupComment(userId: number, createCommentDto: CreateCommentDto) {
    const { commentId } = await this.save({ userId, ...createCommentDto });
    return commentId;
  }

  // 그룹 댓글, 하위 댓글 수정
  async updateGroupComment(
    commentId: number,
    updateCommentDto: UpdateCommentDto,
  ) {
    await this.update(commentId, updateCommentDto);
  }

  // 그룹 댓글, 하위 댓글 삭제
  async deleteGroupComment(commentId: number) {
    await this.softDelete(commentId);
  }

  // 하위 댓글 작성
  async createChildComment(
    parentId: number,
    userId: number,
    createCommentDto: CreateCommentDto,
  ) {
    const { commentId } = await this.save({
      parentId,
      userId,
      ...createCommentDto,
    });
    return commentId;
  }

  // 그룹의 모든 댓글 조회
  async findCommentByGroupId(groupId: number) {
    // 쿼리 빌더 작성할 것
    return this.find({ groupId });
  }
}
