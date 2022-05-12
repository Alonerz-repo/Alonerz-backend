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
import { GroupSwagger } from 'src/swagger/group.swagger';

@Controller('groups')
@ApiTags(GroupSwagger.tag)
export class GroupController {
  constructor(private groupService: GroupService) {}

  // 오늘 참여 그룹 목록 조회
  @Get('today')
  @UseGuards(JwtGuard)
  @ApiOperation(GroupSwagger.operations.getTodayGroups)
  @ApiBearerAuth('AccessToken')
  async getTodayGroups(@Req() req: Request) {
    const { userId } = req.user as Payload;
    return this.groupService.getTodayGroups(userId);
  }

  // 조건부 그룹 목록 조회
  @Get()
  @ApiOperation(GroupSwagger.operations.getGroupsByQuery)
  @ApiQuery(GroupSwagger.query.x)
  @ApiQuery(GroupSwagger.query.y)
  @ApiQuery(GroupSwagger.query.offset)
  @ApiQuery(GroupSwagger.query.when)
  async getGroupsByQuery(
    @Query('x') x: number,
    @Query('y') y: number,
    @Query('offset') offset?: number,
    @Query('when') when?: When,
  ) {
    return await this.groupService.getGroupsByQuery(x, y, offset, when);
  }

  // 사용자의 모든 참여 그룹 목록 조회
  @Get('joined/:userId')
  @ApiOperation(GroupSwagger.operations.getUserGroups)
  @ApiParam(GroupSwagger.param.userId)
  @ApiQuery(GroupSwagger.query.offset)
  async getUserGroups(
    @Param('userId') userId: number,
    @Query('offset') offset?: number,
  ) {
    return await this.groupService.getUserGroups(userId, offset);
  }

  // 그룹 상세 정보 조회
  @Get(':groupId')
  @ApiOperation(GroupSwagger.operations.findGroup)
  @ApiParam(GroupSwagger.param.userId)
  async findGroup(@Param('groupId') groupId: number) {
    return await this.groupService.getGroupInfo(groupId);
  }

  // 새 그룹 생성
  @Post()
  @UseGuards(JwtGuard)
  @ApiOperation(GroupSwagger.operations.createGroup)
  @ApiBearerAuth('AccessToken')
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
  @ApiOperation(GroupSwagger.operations.updateGroup)
  @ApiBearerAuth('AccessToken')
  @ApiParam(GroupSwagger.param.groupId)
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
  @ApiOperation(GroupSwagger.operations.deleteGroup)
  @ApiBearerAuth('AccessToken')
  @ApiParam(GroupSwagger.param.groupId)
  async deleteGroup(@Req() req: Request, @Param('groupId') groupId: number) {
    const { userId } = req.user as Payload;
    return await this.groupService.deleteGroup(userId, groupId);
  }

  // 그룹 참여 및 탈퇴
  @Put(':groupId')
  @UseGuards(JwtGuard)
  @ApiOperation(GroupSwagger.operations.joinOrExitGroup)
  @ApiBearerAuth('AccessToken')
  @ApiParam(GroupSwagger.param.groupId)
  async joinOrExitGroup(
    @Req() req: Request,
    @Param('groupId') groupId: number,
    @Query('action') action: Action,
  ) {
    const { userId } = req.user as Payload;
    return this.groupService.joinOrExitGroup(userId, groupId, action);
  }
}
