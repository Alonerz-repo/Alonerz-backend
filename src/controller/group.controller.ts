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
import { Action, Payload, When } from 'src/common/interface';
import { Request } from 'express';
import { CreateGroupDto, UpdateGroupDto } from 'src/dto/group.dto';

@Controller('groups')
@ApiTags('그룹 API')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @ApiOperation({
    summary: '나의 오늘 참여 그룹 목록 조회 API',
    description:
      '현재 접속한 사용자의 오늘 참여하기로 예정된 그룹 목록을 조회합니다.',
  })
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtGuard)
  @Get('today')
  async getTodayGroups(@Req() req: Request) {
    const { userId } = req.user as Payload;
    return this.groupService.getTodayGroups(userId);
  }

  @ApiOperation({
    summary: '조건부 그룹 목록 조회하기 API',
    description:
      '전체, 아침&점심(`when=lunch`), 저녁&야식(`when=dinner`) 조건으로 참여 가능한 모든 그룹을 조회합니다.',
  })
  @ApiQuery({
    name: 'y',
    type: 'double',
    required: false,
    example: '127.34540366949406',
  })
  @ApiQuery({
    name: 'x',
    type: 'double',
    required: false,
    example: '36.358361084097034',
  })
  @ApiQuery({
    name: 'offset',
    type: 'int',
    required: false,
    example: undefined,
  })
  @ApiQuery({
    name: 'when',
    type: 'string',
    example: undefined,
    required: false,
    description: 'lunch | dinner',
  })
  @Get('?')
  async getGroupsByQuery(
    @Query('x') x: number,
    @Query('y') y: number,
    @Query('offset') offset?: number,
    @Query('when') when?: When,
  ) {
    return await this.groupService.getGroupsByQuery(x, y, offset, when);
  }

  @ApiOperation({
    summary: '사용자별 모든 참여 그룹 목록 조회 API',
    description:
      '이전 참여 그룹을 포함한 사용자별 모든 그룹 목록을 조회합니다.',
  })
  @ApiParam({
    name: 'userId',
    type: 'int',
    example: 1,
  })
  @ApiQuery({
    name: 'offset',
    type: 'int',
    example: undefined,
  })
  @Get('joined/:userId')
  async getUserGroups(
    @Param('userId') userId: number,
    @Query('offset') offset?: number,
  ) {
    return await this.groupService.getUserGroups(userId, offset);
  }

  @ApiOperation({
    summary: '그룹 상세 내용 조회 API',
    description: '그룹의 상세 내용을 조회합니다.',
  })
  @ApiParam({
    name: 'groupId',
    type: 'int',
    example: 1,
  })
  @Get(':groupId')
  async findGroup(@Param('groupId') groupId: number) {
    return await this.groupService.getGroupInfo(groupId);
  }

  @ApiOperation({
    summary: '새 그룹 생성 API',
    description: '새로운 그룹을 생성합니다.',
  })
  @ApiBearerAuth('AccessToken')
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
  @ApiParam({
    name: 'groupId',
    type: 'int',
    example: 1,
  })
  @ApiBearerAuth('AccessToken')
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
  @ApiParam({
    name: 'groupId',
    type: 'int',
    required: true,
    example: 1,
  })
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtGuard)
  @Delete(':groupId')
  async deleteGroup(@Param('groupId') groupId: number) {
    return await this.groupService.deleteGroup(groupId);
  }

  @ApiOperation({
    summary: '그룹 참여 및 탈퇴 API',
    description: '그룹에 참여하거나 그룹에서 탈퇴합니다.',
  })
  @ApiParam({
    name: 'groupId',
    type: 'int',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'action',
    type: 'join | exit',
    required: true,
    example: 'join',
  })
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtGuard)
  @Put(':groupId')
  async joinOrExitGroup(
    @Req() req: Request,
    @Param('groupId') groupId: number,
    @Query('action') action: Action,
  ) {
    const { userId } = req.user as Payload;
    return this.groupService.joinOrExitGroup(userId, groupId, action);
  }
}
