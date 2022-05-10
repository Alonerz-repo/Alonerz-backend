import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GroupService } from 'src/service/group.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/guard/jwt.guard';
import { CreateGroupDto } from 'src/dto/create-group.dto';
import { Payload } from 'src/common/interface';
import { Request } from 'express';
import { UpdateGroupDto } from 'src/dto/update-group.dto';

@Controller('groups')
@ApiTags('그룹 API')
export class GroupController {
  constructor(private groupService: GroupService) {}

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
    @Param('groupId') groupId: number,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return await this.groupService.updateGroup(groupId, updateGroupDto);
  }

  @ApiOperation({
    summary: '그룹 정보 삭제 API',
    description: '그룹 정보를 삭제한다.',
  })
  @UseGuards(JwtGuard)
  @Patch(':groupId')
  async deleteGroup(@Param('groupId') groupId: number) {
    return await this.groupService.deleteGroup(groupId);
  }
}
