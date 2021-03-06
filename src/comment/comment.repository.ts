import {
  selectChildComments,
  selectGroupComments,
} from './select/selectComments';
import { Comment } from './comment.entity';
import { EntityRepository, QueryRunner, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/request/create-comment.dto';
import { UpdateCommentDto } from './dto/request/update-comment.dto';
import { selectCommentUser } from './select/selectCommentUser';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  // 그룹의 댓글 조회
  async findCommentByGroupId(
    groupId: string,
    offset: number,
  ): Promise<Comment[]> {
    return await this.createQueryBuilder('comments')
      .select(selectGroupComments)
      .leftJoin('comments.userId', 'user')
      .addSelect(selectCommentUser)
      .where('comments.groupId = :groupId', { groupId })
      .andWhere('comments.parentId IS NULL')
      .limit(offset ? 10 : 20)
      .offset(offset ? offset : 0)
      .orderBy('comments.createdAt', 'DESC')
      .getMany();
  }

  // 그룹 댓글 작성
  async createGroupComment(
    groupId: string,
    userId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return await this.save({
      groupId,
      userId,
      ...createCommentDto,
    });
  }

  // 하위 댓글 조회
  async findChildComments(groupId: string, parentId: number, offset: number) {
    return await this.createQueryBuilder('comments')
      .select(selectChildComments)
      .leftJoin('comments.userId', 'user')
      .addSelect(selectCommentUser)
      .where('comments.groupId = :groupId', { groupId })
      .andWhere('comments.parentId = :parentId', { parentId })
      .limit(offset ? 10 : 20)
      .offset(offset ? offset : 0)
      .orderBy('comments.createdAt', 'DESC')
      .getMany();
  }

  // 하위 댓글 작성 트랜젝션
  async createChildCommentTransaction(
    queryRunner: QueryRunner,
    groupId: string,
    parentId: number,
    userId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return await queryRunner.manager.save(Comment, {
      groupId,
      parentId,
      userId,
      ...createCommentDto,
    });
  }

  // 그룹 댓글의 하위 댓글 개수 증가 트랜젝션
  async increaseChildCommentCountTransaction(
    queryRunner: QueryRunner,
    parentId: number,
    childCommentCount: number,
  ) {
    await queryRunner.manager.update(
      Comment,
      { commentId: parentId },
      { childCommentCount },
    );
  }

  // 하위 댓글 삭제 트랜젝션
  async deleteChildCommentTransaction(
    queryRunner: QueryRunner,
    commentId: number,
  ): Promise<void> {
    await queryRunner.manager.softDelete(Comment, { commentId });
    return;
  }

  // 그룹 댓글의 하위 댓글 개수 감소 트랜젝션
  async decreaseChildCommentCountTransaction(
    queryRunner: QueryRunner,
    parentId: number,
    childCommentCount: number,
  ) {
    await queryRunner.manager.update(
      Comment,
      { commentId: parentId },
      { childCommentCount },
    );
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
