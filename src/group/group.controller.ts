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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { GroupTime, GroupAction, Payload } from 'src/common/interface';
import { Request } from 'express';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GroupSwagger } from './group.swagger';
import { GroupImageInterceptor } from 'src/image/image.interceptors';

@ApiTags(GroupSwagger.tag)
@Controller('groups')
export class GroupController {
  constructor(private groupService: GroupService) {}

  // 오늘 참여 그룹 목록 조회
  @Get('today')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(GroupSwagger.getTodayGroups.operation)
  @ApiResponse(GroupSwagger.getTodayGroups.response[200])
  @ApiResponse(GroupSwagger.getTodayGroups.response[401])
  async getTodayGroups(@Req() req: Request) {
    const { userId } = req.user as Payload;
    return this.groupService.getTodayGroups(userId);
  }

  // 조건부 그룹 목록 조회
  @Get()
  @ApiQuery(GroupSwagger.getGroupsByQuery.query.x)
  @ApiQuery(GroupSwagger.getGroupsByQuery.query.y)
  @ApiQuery(GroupSwagger.getGroupsByQuery.query.offset)
  @ApiQuery(GroupSwagger.getGroupsByQuery.query.time)
  @ApiOperation(GroupSwagger.getGroupsByQuery.operation)
  @ApiResponse(GroupSwagger.getGroupsByQuery.response[200])
  async getGroupsByQuery(
    @Query('x') x: number,
    @Query('y') y: number,
    @Query('offset') offset?: number,
    @Query('time') time?: GroupTime,
  ) {
    return await this.groupService.getGroupsByQuery(x, y, offset, time);
  }

  // 사용자의 모든 참여 그룹 목록 조회
  @Get(':userId/joined')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiQuery(GroupSwagger.getUserGroups.query.offset)
  @ApiParam(GroupSwagger.getUserGroups.param.userId)
  @ApiOperation(GroupSwagger.getUserGroups.operation)
  @ApiResponse(GroupSwagger.getUserGroups.response[200])
  @ApiResponse(GroupSwagger.getUserGroups.response[401])
  async getUserGroups(
    @Param('userId') userId: string,
    @Query('offset') offset?: number,
  ) {
    return await this.groupService.getUserGroups(userId, offset);
  }

  // 그룹 상세 정보 조회
  @Get(':groupId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiParam(GroupSwagger.getGroupDetail.param.groupId)
  @ApiOperation(GroupSwagger.getGroupDetail.operation)
  @ApiResponse(GroupSwagger.getGroupDetail.response[200])
  @ApiResponse(GroupSwagger.getGroupDetail.response[401])
  @ApiResponse(GroupSwagger.getGroupDetail.response[404])
  async getGroupDetail(@Param('groupId') groupId: string) {
    return await this.groupService.getGroupDetail(groupId);
  }

  // 새 그룹 생성
  @Post()
  @UseGuards(JwtGuard)
  @UseInterceptors(GroupImageInterceptor())
  @ApiBearerAuth('AccessToken')
  @ApiConsumes('multipart/form-data')
  @ApiBody(GroupSwagger.createGroup.body)
  @ApiOperation(GroupSwagger.createGroup.operation)
  @ApiResponse(GroupSwagger.createGroup.response[201])
  @ApiResponse(GroupSwagger.createGroup.response[400])
  @ApiResponse(GroupSwagger.createGroup.response[401])
  async createGroup(
    @Req() req: Request,
    @Body() createGroupDto: CreateGroupDto,
    @UploadedFile() image: Express.MulterS3.File,
  ) {
    const { userId } = req.user as Payload;
    return await this.groupService.createGroup(userId, image, createGroupDto);
  }

  // 그룹 정보 수정
  @Patch(':groupId')
  @UseGuards(JwtGuard)
  @UseInterceptors(GroupImageInterceptor())
  @ApiBearerAuth('AccessToken')
  @ApiConsumes('multipart/form-data')
  @ApiBody(GroupSwagger.updateGroup.body)
  @ApiParam(GroupSwagger.updateGroup.param.groupId)
  @ApiOperation(GroupSwagger.updateGroup.operation)
  @ApiResponse(GroupSwagger.updateGroup.response[200])
  @ApiResponse(GroupSwagger.updateGroup.response[400])
  @ApiResponse(GroupSwagger.updateGroup.response[401])
  @ApiResponse(GroupSwagger.updateGroup.response[404])
  async updateGroup(
    @Req() req: Request,
    @Param('groupId') groupId: string,
    @Body() updateGroupDto: UpdateGroupDto,
    @UploadedFile() image: Express.MulterS3.File,
  ) {
    const { userId } = req.user as Payload;
    return await this.groupService.updateGroup(
      userId,
      groupId,
      image,
      updateGroupDto,
    );
  }

  // 그룹 삭제
  @Delete(':groupId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiParam(GroupSwagger.deleteGroup.param.groupId)
  @ApiOperation(GroupSwagger.deleteGroup.operation)
  @ApiResponse(GroupSwagger.deleteGroup.response[200])
  @ApiResponse(GroupSwagger.deleteGroup.response[401])
  @ApiResponse(GroupSwagger.deleteGroup.response[404])
  async deleteGroup(@Req() req: Request, @Param('groupId') groupId: string) {
    const { userId } = req.user as Payload;
    return await this.groupService.deleteGroup(userId, groupId);
  }

  // 그룹 참여 및 탈퇴
  @Put(':groupId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiQuery(GroupSwagger.joinOrExit.query.action)
  @ApiParam(GroupSwagger.joinOrExit.param.groupId)
  @ApiOperation(GroupSwagger.joinOrExit.operation)
  @ApiResponse(GroupSwagger.joinOrExit.response[200])
  @ApiResponse(GroupSwagger.joinOrExit.response[400])
  @ApiResponse(GroupSwagger.joinOrExit.response[401])
  @ApiResponse(GroupSwagger.joinOrExit.response[404])
  async joinOrExit(
    @Req() req: Request,
    @Param('groupId') groupId: string,
    @Query('action') action: GroupAction,
  ) {
    const { userId } = req.user as Payload;
    return this.groupService.joinOrExitGroup(userId, groupId, action);
  }
}
