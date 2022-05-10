import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from 'src/service/group.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/guard/jwt.guard';
import { Payload } from 'src/common/interface';
import { Request } from 'express';
import { CreateGroupDto } from 'src/dto/create-group.dto';
import { UpdateGroupDto } from 'src/dto/update-group.dto';
import { CreateCommentDto } from 'src/dto/create-comment.dto';
import { UpdateCommentDto } from 'src/dto/update-comment.dto';

@Controller('groups')
@ApiTags('그룹 API')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @ApiOperation({
    summary: '나의 오늘 참여 그룹 목록 조회 API',
    description: '사용자의 오늘 참여하는 그룹 목록을 조회한다.',
  })
  @UseGuards(JwtGuard)
  @Get('today')
  async findTodayGroups(@Req() req: Request) {
    const { userId } = req.user as Payload;
    return;
  }

  @ApiOperation({
    summary: '사용자별 모든 참여 그룹 목록 조회 API',
    description: '사용자별 지금까지 참여한 그룹 목록을 조회한다.',
  })
  @Get('joined/:userId')
  async findJoinedGroups(@Param('userId') userId: number) {
    return;
  }

  @ApiOperation({
    summary: '아침 & 점심 그룹 목록 조회하기 API',
    description: '아침과 점심에 모임을 가지는 그룹 목록을 조회한다',
  })
  @Get('afternoon')
  async findAfternoonGroups(@Query('x') x: number, @Query('y') y: number) {
    return;
  }

  @ApiOperation({
    summary: '저녁 & 야식 그룹 목록 조회하기 API',
    description: '저녁과 야식시간에 모임을 가지는 그룹 목록을 조회한다',
  })
  @Get('dinner')
  async findDinnerGroups(@Query('x') x: number, @Query('y') y: number) {
    return;
  }

  @ApiOperation({
    summary: '그룹 생성 API',
    description: '그룹을 생성합니다.',
  })
  @UseGuards(JwtGuard)
  @Post()
  async createGroup(
    @Req() req: Request,
    @Body() createGroupDto: CreateGroupDto,
  ) {
    const { userId } = req.user as Payload;
    return await this.groupService.createGroup(userId, createGroupDto);
  }

  @ApiOperation({
    summary: '그룹 정보 수정 API',
    description: '그룹 정보를 수정한다.',
  })
  @UseGuards(JwtGuard)
  @Patch(':groupId')
  async editGroup(
    @Req() req: Request,
    @Param('groupId') groupId: number,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    const { userId } = req.user as Payload;
    return await this.groupService.updateGroup(groupId, updateGroupDto);
  }

  @ApiOperation({
    summary: '그룹 정보 삭제 API',
    description: '그룹 정보를 삭제한다.',
  })
  @UseGuards(JwtGuard)
  @Delete(':groupId')
  async deleteGroup(@Req() req: Request, @Param('groupId') groupId: number) {
    const { userId } = req.user as Payload;
    return await this.groupService.deleteGroup(groupId);
  }

  @ApiOperation({
    summary: '특정 그룹 상세 내용 조회 API',
    description: '특정 그룹의 상세 내용을 조회한다.',
  })
  @Get(':groupId')
  async findGroup(@Param('groupId') groupId: number) {
    return;
  }

  @ApiOperation({
    summary: '특정 그룹 댓글 조회 API',
    description: '특정 그룹의 댓글 목록을 조회한다.',
  })
  @Get(':groupId/comments')
  async findComments(@Param('groupId') groupId: number) {
    return;
  }

  @ApiOperation({
    summary: '특정 그룹 댓글 작성 API',
    description: '특정 그룹에 댓글을 작성한다.',
  })
  @UseGuards(JwtGuard)
  @Post(':groupId/comments')
  async createComment(
    @Req() req: Request,
    @Param('groupId') groupId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const { userId } = req.user as Payload;
    return;
  }

  @ApiOperation({
    summary: '특정 그룹 댓글 수정 API',
    description: '특정 그룹의 특정 댓글을 수정한다.',
  })
  @UseGuards(JwtGuard)
  @Patch(':groupId/comments/:commentId')
  async editComment(
    @Req() req: Request,
    @Param('groupId') groupId: number,
    @Param('commentId') commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const { userId } = req.user as Payload;
    return;
  }

  @ApiOperation({
    summary: '특정 그룹 댓글 삭제 API',
    description: '특정 그룹의 특정 댓글을 삭제한다.',
  })
  @UseGuards(JwtGuard)
  @Delete(':groupId/comments/:commentId')
  async deleteComment(
    @Req() req: Request,
    @Param('groupId') groupId: number,
    @Param('commentId') commentId: number,
  ) {
    const { userId } = req.user as Payload;
    return;
  }

  @ApiOperation({
    summary: '특정 댓글의 하위 댓글 조회 API',
    description: '특정 댓글의 하위 댓글 목록을 조회한다.',
  })
  @Get(':groupId/comments/:parentId')
  async findChildComments(
    @Param('groupId') groupId: number,
    @Param('parentId') parentId: number,
  ) {
    return;
  }

  @ApiOperation({
    summary: '특정 댓글의 하위 댓글 작성 API',
    description: '특정 댓글의 하위 댓글을 작성한다.',
  })
  @UseGuards(JwtGuard)
  @Post(':groupId/comments/:parentId')
  async createChildComment(
    @Req() req: Request,
    @Param('groupId') groupId: number,
    @Param('parentId') parentId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const { userId } = req.user as Payload;
    return;
  }

  @ApiOperation({
    summary: '특정 댓글의 하위 댓글 수정 API',
    description: '특정 댓글의 하위 댓글을 수정한다.',
  })
  @UseGuards(JwtGuard)
  @Patch(':groupId/comments/:parentId/:commentId')
  async editChildComment(
    @Req() req: Request,
    @Param('groupId') groupId: number,
    @Param('parentId') parentId: number,
    @Param('commentId') commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const { userId } = req.user as Payload;
    return;
  }

  @ApiOperation({
    summary: '특정 댓글의 하위 댓글 삭제 API',
    description: '특정 댓글의 하위 댓글을 삭제한다.',
  })
  @UseGuards(JwtGuard)
  @Delete(':groupId/comments/:parentId/:commentId')
  async deleteChildComment(
    @Req() req: Request,
    @Param('groupId') groupId: number,
    @Param('parentId') parentId: number,
    @Param('commentId') commentId: number,
  ) {
    const { userId } = req.user as Payload;
    return;
  }

  @ApiOperation({
    summary: '그룹 참여 API',
    description: '그룹에 참여한다.',
  })
  @UseGuards(JwtGuard)
  @Post(':groupId/join')
  async JoinGroup(@Req() req: Request, @Param('groupId') groupId: number) {
    const { userId } = req.user as Payload;
    return;
  }

  @ApiOperation({
    summary: '그룹 탈퇴 API',
    description: '그룹을 탈퇴한다.',
  })
  @UseGuards(JwtGuard)
  @Delete(':groupId/exit')
  async ExitGroup(@Req() req: Request, @Param('groupId') groupId: number) {
    const { userId } = req.user as Payload;
    return;
  }
}
