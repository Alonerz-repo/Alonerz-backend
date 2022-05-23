import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { CommentException } from './comment.exception';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/request/create-comment.dto';
import { UpdateCommentDto } from './dto/request/update-comment.dto';
import { SelectCommentDto } from './dto/response/select-comment.dto';
import { SelectCommentsDto } from './dto/response/select-comments.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private readonly commentRepository: CommentRepository,
    private readonly commentException: CommentException,
    private readonly connection: Connection,
  ) {}

  // 댓글 존재 여부 및 하위 댓글수 확인
  private async findComment(commentId: number): Promise<number> {
    const comment = await this.commentRepository.findOne({ commentId });
    if (!comment) {
      this.commentException.NotFound();
    }
    return comment.childCommentCount;
  }

  // 그룹 댓글 접근 권한 확인
  private async accessComment(
    userId: string,
    commentId: number,
  ): Promise<void> {
    const comment = await this.commentRepository.findOne({ userId, commentId });
    if (!comment) {
      this.commentException.AccessDenined();
    }
  }

  // 그룹 댓글 조회
  async getGroupComments(
    groupId: string,
    offset: number,
  ): Promise<SelectCommentsDto> {
    const comments = await this.commentRepository.findCommentByGroupId(
      groupId,
      offset,
    );
    return new SelectCommentsDto(comments);
  }

  // 그룹 댓글 작성
  async createGroupComment(
    groupId: string,
    userId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<SelectCommentDto> {
    const comment = await this.commentRepository.createGroupComment(
      groupId,
      userId,
      createCommentDto,
    );
    return new SelectCommentDto(comment);
  }

  // 하위 댓글 조회
  async getChildComments(
    groupId: string,
    parentId: number,
    offset: number,
  ): Promise<SelectCommentsDto> {
    await this.findComment(parentId);
    const comments = await this.commentRepository.findChildComments(
      groupId,
      parentId,
      offset,
    );
    return new SelectCommentsDto(comments);
  }

  // 하위 댓글 작성
  async createChildComment(
    groupId: string,
    parentId: number,
    userId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<SelectCommentDto> {
    const childCommentCount = await this.findComment(parentId);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let error = null;
    let comment = null;
    try {
      // 하위 comment 등록
      comment = await this.commentRepository.createChildCommentTransaction(
        queryRunner,
        groupId,
        parentId,
        userId,
        createCommentDto,
      );
      // 상위 comment의 childComments += 1
      await this.commentRepository.increaseChildCommentCountTransaction(
        queryRunner,
        parentId,
        childCommentCount + 1,
      );
      await queryRunner.commitTransaction();
    } catch (e) {
      error = e;
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    if (error) {
      this.commentException.Transaction();
    }

    return new SelectCommentDto(comment);
  }

  // 댓글 수정
  async updateComment(
    userId: string,
    commentId: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<void> {
    await this.accessComment(userId, commentId);
    await this.commentRepository.updateComment(commentId, updateCommentDto);
  }

  // 댓글 삭제
  async deleteComment(userId: string, commentId: number): Promise<void> {
    await this.accessComment(userId, commentId);
    await this.commentRepository.deleteComment(commentId);
  }
}
