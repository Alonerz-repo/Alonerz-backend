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
import { CreateGroupDto } from 'src/dto/group.dto';
import { Payload } from 'src/common/interface';
import { Request } from 'express';

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
  async patchGroup(@Param('groupId') groupId: number, @Body() groupData: any) {
    return await this.groupService.updateGroup(groupId, groupData);
  }
}
