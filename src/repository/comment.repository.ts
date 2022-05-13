import { CreateCommentDto, UpdateCommentDto } from 'src/dto/comment.dto';
import { Comment } from 'src/entity/comment.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  private select = {
    user: ['user.userId', 'user.nickname', 'user.profileImageUrl'],
    comments: [
      'comments.commentId',
      'comments.groupId',
      'comments.content',
      'comments.createdAt',
      'comments.updatedAt',
    ],
  };

  // 그룹의 댓글 조회
  async findCommentByGroupId(groupId: number, offset: number) {
    const index = offset ? offset : 0;
    const limit = offset ? 10 : 20;
    return await this.createQueryBuilder('comments')
      .select(this.select.comments)
      .leftJoin('comments.userId', 'user')
      .addSelect(this.select.user)
      .where('comments.groupId = :groupId', { groupId })
      .andWhere('comments.commentId > :index', { index })
      .limit(limit)
      .getMany();
  }

  // 그룹 댓글 작성
  async createGroupComment(
    groupId: number,
    userId: number,
    createCommentDto: CreateCommentDto,
  ) {
    console.log(groupId, userId);
    await this.save({
      ...createCommentDto,
      groupId,
      userId,
    });
  }

  // 하위 댓글 조회
  async findChildComments(groupId: number, parentId: number, offset: number) {
    const index = offset ? offset : 0;
    const limit = offset ? 10 : 20;
    return await this.createQueryBuilder('comments')
      .select(this.select.comments)
      .leftJoin('comments.userId', 'user')
      .addSelect(this.select.user)
      .where('comments.groupId = :groupId', { groupId })
      .andWhere('comments.parentId = :parentId', { parentId })
      .andWhere('comments.commentId > :index', { index })
      .limit(limit)
      .getMany();
  }

  // 하위 댓글 작성
  async createChildComment(
    groupId: number,
    userId: number,
    parentId: number,
    createCommentDto: CreateCommentDto,
  ) {
    console.log(groupId, userId);
    await this.save({
      ...createCommentDto,
      groupId,
      userId,
      parentId,
    });
  }

  // 댓글 수정
  async updateComment(commentId: number, updateCommentDto: UpdateCommentDto) {
    await this.update(commentId, updateCommentDto);
  }

  // 댓글 삭제
  async deleteComment(commentId: number) {
    await this.softDelete(commentId);
  }
}
