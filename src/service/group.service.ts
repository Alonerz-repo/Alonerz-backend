import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupAction, GroupTime } from 'src/common/interface';
import { CreateCommentDto, UpdateCommentDto } from 'src/dto/comment.dto';
import { CreateGroupDto, UpdateGroupDto } from 'src/dto/group.dto';
import { GroupUser } from 'src/entity/group-user.entity';
import {
  BadRequestAny,
  BadRequestGroup,
  ForbiddenComment,
  ForbiddenGroup,
  NotFoundComment,
  NotFoundGroup,
} from 'src/exception/group.exception';
import { CommentRepository } from 'src/repository/comment.repository';
import { GroupRepository } from 'src/repository/group.repository';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupRepository)
    private readonly groupRepository: GroupRepository,
    @InjectRepository(GroupUser)
    private readonly groupUserRepository: Repository<GroupUser>,
    @InjectRepository(CommentRepository)
    private readonly commentRepository: CommentRepository,
  ) {}

  // 그룹 존재 여부 확인
  private async findGroup(groupId: number) {
    const group = await this.groupRepository.findOne(groupId);
    return group ? group : NotFoundGroup();
  }

  // 그룹 접근 권한 확인
  private async accessGroup(userId: number, groupId: number) {
    const group = await this.groupRepository.findOne({ groupId, host: userId });
    return group ? group : ForbiddenGroup();
  }

  // 그룹 댓글 존재 여부 확인
  private async findComment(commentId: number) {
    const comment = await this.commentRepository.findOne(commentId);
    return comment ? comment : NotFoundComment();
  }

  // 그룹 댓글 접근 권한 확인
  private async accessComment(userId: number, commentId: number) {
    const comment = await this.commentRepository.findOne({ userId, commentId });
    return comment ? comment : ForbiddenComment();
  }

  // 새 그룹 추가
  async createGroup(userId: number, createGroupDto: CreateGroupDto) {
    // 현재 사용자가 참여 중인 그룹의 시간과 겹치는지 확인 후 생성
    return await this.groupRepository.createGroup(userId, createGroupDto);
  }

  // 그룹 정보 수정
  async updateGroup(
    userId: number,
    groupId: number,
    updateGroupDto: UpdateGroupDto,
  ) {
    await this.accessGroup(userId, groupId);
    await this.groupRepository.updateGroup(groupId, updateGroupDto);
  }

  // 그룹 삭제
  async deleteGroup(userId: number, groupId: number) {
    await this.accessGroup(userId, groupId);
    await this.groupRepository.deleteGroup(groupId);
  }

  // 오늘 참여 그룹 목록 조회
  async getTodayGroups(userId: number) {
    const groups = await this.groupRepository.findTodayGroups(userId);
    return { groups };
  }

  // 특정 그룹 정보 조회
  async getGroupInfo(groupId: number) {
    const group = await this.groupRepository.findGroupInfo(groupId);
    !group && NotFoundGroup();
    group.guests = group.guests.map((guest: any) => guest.guest);
    return { group };
  }

  // 조건에 따른 그룹 목록 조회
  async getGroupsByQuery(
    x: number,
    y: number,
    offset?: number,
    when?: GroupTime,
  ) {
    const groups = await this.groupRepository.findGroupsByQuery(
      x,
      y,
      offset,
      when,
    );
    return { groups };
  }

  // 사용자의 모든 그룹 조회
  async getUserGroups(userId: number, offset?: number) {
    const groups = await this.groupRepository.findGroupsByUserId(
      userId,
      offset,
    );
    return { groups };
  }

  // 그룹 참여 및 탈퇴
  async joinOrExitGroup(userId: number, groupId: number, action: GroupAction) {
    !['join', 'exit'].includes(action) && BadRequestAny();
    const isHost = await this.accessGroup(userId, groupId);
    isHost && BadRequestGroup();
    action === 'join'
      ? await this.groupUserRepository.save({ groupId, guest: userId })
      : await this.groupUserRepository.softDelete({ groupId, guest: userId });
  }

  // 그룹 댓글 조회
  async getGroupComments(groupId: number, offset: number) {
    await this.findGroup(groupId);
    const rows = await this.commentRepository.findCommentByGroupId(
      groupId,
      offset,
    );
    const comments = rows.map((row) => {
      const comment = row as any;
      comment.user = row.userId;
      delete comment.userId;
      return comment;
    });
    return { comments };
  }

  // 그룹 댓글 작성
  async createGroupComment(
    groupId: number,
    userId: number,
    createCommentDto: CreateCommentDto,
  ) {
    await this.findGroup(groupId);
    await this.commentRepository.createGroupComment(
      groupId,
      userId,
      createCommentDto,
    );
  }

  // 하위 댓글 조회
  async getChildComments(groupId: number, parentId: number, offset: number) {
    await this.findComment(parentId);
    const rows = await this.commentRepository.findChildComments(
      groupId,
      parentId,
      offset,
    );
    const comments = rows.map((row) => {
      const comment = row as any;
      comment.user = row.userId;
      delete comment.userId;
      return comment;
    });
    return { comments };
  }

  // 하위 댓글 작성
  async createChildComment(
    groupId: number,
    parentId: number,
    userId: number,
    createCommentDto: CreateCommentDto,
  ) {
    await this.findGroup(groupId);
    await this.findComment(parentId);
    await this.commentRepository.createChildComment(
      groupId,
      userId,
      parentId,
      createCommentDto,
    );
  }

  // 댓글 수정
  async updateComment(
    groupId: number,
    userId: number,
    commentId: number,
    updateCommentDto: UpdateCommentDto,
  ) {
    await this.findGroup(groupId);
    await this.accessComment(userId, commentId);
    await this.commentRepository.updateComment(commentId, updateCommentDto);
  }

  // 댓글 삭제
  async deleteComment(groupId: number, userId: number, commentId: number) {
    await this.findGroup(groupId);
    await this.accessComment(userId, commentId);
    await this.commentRepository.deleteComment(commentId);
  }
}
