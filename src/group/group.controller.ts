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
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GroupTime, GroupAction, Payload } from 'src/common/interface';
import { Request } from 'express';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GroupSwagger } from './group.swagger';

@ApiTags(GroupSwagger.tag)
@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  // 오늘 참여 그룹 목록 조회
  @Get('today')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(GroupSwagger.routes.getTodayGroups)
  @ApiResponse(GroupSwagger.response.getTodayGroups[200])
  @ApiResponse(GroupSwagger.response.getTodayGroups[401])
  async getTodayGroups(@Req() req: Request) {
    const { userId } = req.user as Payload;
    return this.groupService.getTodayGroups(userId);
  }

  // 조건부 그룹 목록 조회
  @Get()
  @ApiQuery(GroupSwagger.query.x)
  @ApiQuery(GroupSwagger.query.y)
  @ApiQuery(GroupSwagger.query.offset)
  @ApiQuery(GroupSwagger.query.time)
  @ApiOperation(GroupSwagger.routes.getGroupsByQuery)
  @ApiResponse(GroupSwagger.response.getGroupsByQuery[200])
  async getGroupsByQuery(
    @Query('x') x: number,
    @Query('y') y: number,
    @Query('offset') offset?: number,
    @Query('time') time?: GroupTime,
  ) {
    return await this.groupService.getGroupsByQuery(x, y, offset, time);
  }

  // 사용자의 모든 참여 그룹 목록 조회
  @Get('joined/:userId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiQuery(GroupSwagger.query.offset)
  @ApiParam(GroupSwagger.param.userId)
  @ApiOperation(GroupSwagger.routes.getUserGroups)
  @ApiResponse(GroupSwagger.response.getUserGroups[200])
  @ApiResponse(GroupSwagger.response.getUserGroups[401])
  @ApiResponse(GroupSwagger.response.getUserGroups[404])
  async getUserGroups(
    @Param('userId') userId: number,
    @Query('offset') offset?: number,
  ) {
    return await this.groupService.getUserGroups(userId, offset);
  }

  // 그룹 상세 정보 조회
  @Get(':groupId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiParam(GroupSwagger.param.groupId)
  @ApiOperation(GroupSwagger.routes.getGroupDetail)
  @ApiResponse(GroupSwagger.response.getGroupDetail[200])
  @ApiResponse(GroupSwagger.response.getGroupDetail[401])
  @ApiResponse(GroupSwagger.response.getGroupDetail[404])
  async getGroupDetail(@Param('groupId') groupId: number) {
    return await this.groupService.getGroupDetail(groupId);
  }

  // 새 그룹 생성
  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(GroupSwagger.routes.createGroup)
  @ApiResponse(GroupSwagger.response.createGroup[201])
  @ApiResponse(GroupSwagger.response.createGroup[400])
  @ApiResponse(GroupSwagger.response.createGroup[401])
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
  @ApiParam(GroupSwagger.param.groupId)
  @ApiOperation(GroupSwagger.routes.updateGroup)
  @ApiResponse(GroupSwagger.response.updateGroup[200])
  @ApiResponse(GroupSwagger.response.updateGroup[400])
  @ApiResponse(GroupSwagger.response.updateGroup[401])
  @ApiResponse(GroupSwagger.response.updateGroup[404])
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
  @ApiParam(GroupSwagger.param.groupId)
  @ApiOperation(GroupSwagger.routes.deleteGroup)
  @ApiResponse(GroupSwagger.response.deleteGroup[200])
  @ApiResponse(GroupSwagger.response.deleteGroup[401])
  @ApiResponse(GroupSwagger.response.deleteGroup[404])
  async deleteGroup(@Req() req: Request, @Param('groupId') groupId: number) {
    const { userId } = req.user as Payload;
    return await this.groupService.deleteGroup(userId, groupId);
  }

  // 그룹 참여 및 탈퇴
  @Put(':groupId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiQuery(GroupSwagger.query.action)
  @ApiParam(GroupSwagger.param.groupId)
  @ApiOperation(GroupSwagger.routes.joinOrExit)
  @ApiResponse(GroupSwagger.response.joinOrExit[200])
  @ApiResponse(GroupSwagger.response.joinOrExit[400])
  @ApiResponse(GroupSwagger.response.joinOrExit[401])
  @ApiResponse(GroupSwagger.response.joinOrExit[404])
  async joinOrExit(
    @Req() req: Request,
    @Param('groupId') groupId: number,
    @Query('action') action: GroupAction,
  ) {
    const { userId } = req.user as Payload;
    return this.groupService.joinOrExitGroup(userId, groupId, action);
  }
}
