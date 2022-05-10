import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { GroupService } from 'src/service/group.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/guard/jwt.guard';
import { GroupDto } from 'src/dto/group.dto';

@Controller('groups')
@ApiTags('그룹 API')
export class GroupController {
  constructor(
    private groupService: GroupService,
    private configService: ConfigService,
  ) {}

  @ApiOperation({
    summary: '그룹 생성 API',
    description: '그룹을 생성합니다.',
  })
  @UseGuards(JwtGuard)
  @Post()
  async createGroup(@Body() groupData: GroupDto) {
    return await this.groupService.createGroup(groupData);
  }

  @ApiOperation({
    summary: '그룹 정보 수정 API',
    description: '그룹 정보를 수정한다.',
  })
  @UseGuards(JwtGuard)
  @Patch(':groupId')
  async patchGroup(
    @Param('groupId') groupId: number,
    @Body() groupData: GroupDto,
  ) {
    return await this.groupService.updateGroup(groupId, groupData);
  }
}
