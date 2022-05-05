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
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { CreateGroupDto } from './dto/create.group.dto';
import { UpdateGroupDto } from './dto/update.group.dto';
import { Group } from './entities/group.entity';
import { GroupService } from './group.service';

@Controller('api/groups')
export class GroupController {
  constructor(private readonly service: GroupService) {}

  @Get()
  async getAllGroups(@Query('take') take?: number): Promise<Group[]> {
    return await this.service.getAllGroups(take);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getGroup(@Param('id') groupId: number): Promise<Group> {
    return await this.service.getGroup(groupId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createGroup(
    @Req() req: Request,
    @Body() createGroupDto: CreateGroupDto,
  ): Promise<number> {
    const { kakaoId }: JwtPayload = req.user;
    return this.service.createGroup(kakaoId, createGroupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateGroup(
    @Req() req: Request,
    @Param('id') groupId: number,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<void> {
    const { kakaoId }: JwtPayload = req.user;
    return this.service.updateGroup(kakaoId, groupId, updateGroupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteGroup(
    @Req() req: Request,
    @Param('id') groupId: number,
  ): Promise<void> {
    const { kakaoId }: JwtPayload = req.user;
    return this.service.deleteGroup(kakaoId, groupId);
  }
}
