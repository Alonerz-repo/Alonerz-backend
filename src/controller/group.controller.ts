import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from 'src/service/group.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/guard/jwt.guard';
import { GroupTime, GroupAction, Payload } from 'src/common/interface';
import { Request } from 'express';
import { CreateGroupDto, UpdateGroupDto } from 'src/dto/group.dto';
import {
  GroupTag,
  GroupOperation,
} from 'src/swagger/operation/group.operation';
import { GroupQuery } from 'src/swagger/query/group.query';
import { GroupParam } from 'src/swagger/param/group.param';
import { CreateCommentDto, UpdateCommentDto } from 'src/dto/comment.dto';

@Controller('groups')
@ApiTags(GroupTag)
export class GroupController {
  constructor(private groupService: GroupService) {}

  // 오늘 참여 그룹 목록 조회
  @Get('today')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(GroupOperation.getTodayGroups)
  async getTodayGroups(@Req() req: Request) {
    const { userId } = req.user as Payload;
    return this.groupService.getTodayGroups(userId);
  }

  // 조건부 그룹 목록 조회
  @Get()
  @ApiOperation(GroupOperation.getGroupsByQuery)
  @ApiQuery(GroupQuery.x)
  @ApiQuery(GroupQuery.y)
  @ApiQuery(GroupQuery.offset)
  @ApiQuery(GroupQuery.when)
  async getGroupsByQuery(
    @Query('x') x: number,
    @Query('y') y: number,
    @Query('offset') offset?: number,
    @Query('when') when?: GroupTime,
  ) {
    return await this.groupService.getGroupsByQuery(x, y, offset, when);
  }

  // 사용자의 모든 참여 그룹 목록 조회
  @Get('joined/:userId')
  @ApiOperation(GroupOperation.getUserGroups)
  @ApiParam(GroupParam.userId)
  @ApiQuery(GroupQuery.offset)
  async getUserGroups(
    @Param('userId') userId: number,
    @Query('offset') offset?: number,
  ) {
    return await this.groupService.getUserGroups(userId, offset);
  }

  // 그룹 상세 정보 조회
  @Get(':groupId')
  @ApiOperation(GroupOperation.findGroup)
  @ApiParam(GroupParam.userId)
  async findGroup(@Param('groupId') groupId: number) {
    return await this.groupService.getGroupInfo(groupId);
  }

  // 새 그룹 생성
  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(GroupOperation.createGroup)
  async createGroup(
    @Req() req: Request,
    @Body() createGroupDto: CreateGroupDto,
  ) {
    const { userId } = req.user as Payload;
    return await this.groupService.createGroup(userId, createGroupDto);
  }

  // 그룹 정보 수정
  @Patch(':groupId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(GroupOperation.updateGroup)
  @ApiParam(GroupParam.groupId)
  async updateGroup(
    @Req() req: Request,
    @Param('groupId') groupId: number,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    const { userId } = req.user as Payload;
    return await this.groupService.updateGroup(userId, groupId, updateGroupDto);
  }

  // 그룹 삭제
  @Delete(':groupId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(GroupOperation.deleteGroup)
  @ApiParam(GroupParam.groupId)
  async deleteGroup(@Req() req: Request, @Param('groupId') groupId: number) {
    const { userId } = req.user as Payload;
    return await this.groupService.deleteGroup(userId, groupId);
  }

  // 그룹 참여 및 탈퇴
  @Put(':groupId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(GroupOperation.joinOrExitGroup)
  @ApiParam(GroupParam.groupId)
  async joinOrExitGroup(
    @Req() req: Request,
    @Param('groupId') groupId: number,
    @Query('action') action: GroupAction,
  ) {
    const { userId } = req.user as Payload;
    return this.groupService.joinOrExitGroup(userId, groupId, action);
  }

  // 그룹 댓글 조회
  @Get(':groupId/comments')
  @ApiOperation(GroupOperation.getGroupComments)
  @ApiParam(GroupParam.groupId)
  @ApiQuery(GroupQuery.offset)
  async getGroupComments(
    @Param('groupId') groupId: number,
    @Query('offset') offset: number,
  ) {
    return await this.groupService.getGroupComments(groupId, offset);
  }

  // 그룹 댓글 작성
  @Post(':groupId/comments')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(GroupOperation.createGroupComment)
  @ApiParam(GroupParam.groupId)
  async creteGroupComment(
    @Req() req: Request,
    @Param('groupId') groupId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const { userId } = req.user as Payload;
    return await this.groupService.createGroupComment(
      groupId,
      userId,
      createCommentDto,
    );
  }

  // 하위 댓글 조회
  @Get(':groupId/comments/:parentId')
  @ApiOperation(GroupOperation.getChildComments)
  @ApiParam(GroupParam.groupId)
  @ApiParam(GroupParam.parentId)
  @ApiQuery(GroupQuery.offset)
  async getChildComments(
    @Param('groupId') groupId: number,
    @Param('parentId') parentId: number,
    @Query('offset') offset: number,
  ) {
    return await this.groupService.getChildComments(groupId, parentId, offset);
  }

  // 하위 댓글 작성
  @Post(':groupId/comments/:parentId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(GroupOperation.createChildComment)
  @ApiParam(GroupParam.groupId)
  @ApiParam(GroupParam.parentId)
  async createChildComment(
    @Req() req: Request,
    @Param('groupId') groupId: number,
    @Param('parentId') parentId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const { userId } = req.user as Payload;
    return await this.groupService.createChildComment(
      groupId,
      parentId,
      userId,
      createCommentDto,
    );
  }

  // 댓글 수정
  @Patch(':groupId/comments/:commentId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(GroupOperation.updateComment)
  @ApiParam(GroupParam.groupId)
  @ApiParam(GroupParam.commentId)
  async updateComment(
    @Req() req: Request,
    @Param('groupId') groupId: number,
    @Param('commentId') commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const { userId } = req.user as Payload;
    return await this.groupService.updateComment(
      groupId,
      userId,
      commentId,
      updateCommentDto,
    );
  }

  // 댓글 삭제
  @Delete(':groupId/comments/:commentId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(GroupOperation.deleteComment)
  @ApiParam(GroupParam.groupId)
  @ApiParam(GroupParam.commentId)
  async deleteComment(
    @Req() req: Request,
    @Param('groupId') groupId: number,
    @Param('commentId') commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const { userId } = req.user as Payload;
    return await this.groupService.updateComment(
      groupId,
      userId,
      commentId,
      updateCommentDto,
    );
  }
}
