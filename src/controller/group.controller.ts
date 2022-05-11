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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/guard/jwt.guard';
import { Payload } from 'src/common/interface';
import { Request } from 'express';
import {
  CommentDto,
  CreateGroupDto,
  UpdateGroupDto,
  GroupQueryDto,
} from 'src/dto/group.dto';

@Controller('groups')
@ApiTags('그룹 API')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @ApiOperation({
    summary: '나의 오늘 참여 그룹 목록 조회 API',
    description:
      '현재 접속한 사용자의 오늘 참여하기로 예정된 그룹 목록을 조회합니다.',
  })
  @UseGuards(JwtGuard)
  @Get('today')
  async getTodayGroups(@Req() req: Request) {
    const { userId } = req.user as Payload;
    return this.groupService.getTodayGroups(userId);
  }

  @ApiOperation({
    summary: '아침 & 점심 그룹 목록 조회하기 API',
    description:
      '아침 & 점심시간에 해당하는 참여 가능한 모든 그룹을 조회합니다.',
  })
  @Get('lunch')
  async getLunchGroups(@Query() groupQueryDto: GroupQueryDto) {
    const { x, y } = groupQueryDto;
    return await this.groupService.getLunchGroups(x, y);
  }

  @ApiOperation({
    summary: '저녁 & 야식 그룹 목록 조회하기 API',
    description:
      '저녁 & 야식시간에 해당하는 참여 가능한 모든 그룹을 조회합니다.',
  })
  @Get('dinner')
  async getDinnerGroups(@Query() groupQueryDto: GroupQueryDto) {
    const { x, y } = groupQueryDto;
    return await this.groupService.getDinnerGroups(x, y);
  }

  @ApiOperation({
    summary: '전체 그룹 목록 조회하기 API',
    description: '현재 참여 가능한 모든 그룹을 조회합니다.',
  })
  @Get('dinner')
  async getAllGroups(@Query() groupQueryDto: GroupQueryDto) {
    const { x, y } = groupQueryDto;
    return await this.groupService.getDinnerGroups(x, y);
  }

  @ApiOperation({
    summary: '사용자별 모든 참여 그룹 목록 조회 API',
    description:
      '이전 참여 그룹을 포함한 사용자별 모든 그룹 목록을 조회합니다.',
  })
  @Get('joined/:userId')
  async findJoinedGroups(@Param('userId') userId: number) {
    return;
  }

  @ApiOperation({
    summary: '그룹 상세 내용 조회 API',
    description: '그룹의 상세 내용을 조회합니다.',
  })
  @Get(':groupId')
  async findGroup(@Param('groupId') groupId: number) {
    return await this.groupService.getGroupInfo(groupId);
  }

  @ApiOperation({
    summary: '새 그룹 생성 API',
    description: '새로운 그룹을 생성합니다.',
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
    description: '그룹 정보를 수정합니다.',
  })
  @UseGuards(JwtGuard)
  @Patch(':groupId')
  async updateGroup(
    @Param('groupId') groupId: number,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return await this.groupService.updateGroup(groupId, updateGroupDto);
  }

  @ApiOperation({
    summary: '그룹 정보 삭제 API',
    description: '그룹 정보를 삭제합니다.',
  })
  @UseGuards(JwtGuard)
  @Delete(':groupId')
  async deleteGroup(@Param('groupId') groupId: number) {
    return await this.groupService.deleteGroup(groupId);
  }

  @ApiOperation({
    summary: '그룹 참여 API',
    description: '그룹에 참여합니다.',
  })
  @UseGuards(JwtGuard)
  @Put()
  async joinGroup() {
    return;
  }

  @ApiOperation({
    summary: '그룹 탈퇴 API',
    description: '그룹에서 탈퇴합니다.',
  })
  @UseGuards(JwtGuard)
  @Put()
  async exitGroup() {
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
    @Body() createCommentDto: CommentDto,
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
    @Body() updateCommentDto: CommentDto,
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
    @Body() createCommentDto: CommentDto,
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
    @Body() updateCommentDto: CommentDto,
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
