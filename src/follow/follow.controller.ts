import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Payload } from 'src/common/interface';
import { FollowService } from './follow.service';
import { FollowSwagger } from './follow.swagger';

@ApiTags(FollowSwagger.tag)
@Controller('follows')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  // 사용자의 팔로잉 목록 조회
  @Get(':userId/following')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(FollowSwagger.getUserFollows.operation)
  @ApiParam(FollowSwagger.getUserFollows.param.userId)
  @ApiResponse(FollowSwagger.getUserFollows.response[200])
  @ApiResponse(FollowSwagger.getUserFollows.response[401])
  async getFollowings(@Param('userId') userId: string) {
    return await this.followService.getFollowings(userId);
  }

  // 사용자의 팔로워 목록 조회
  @Get(':userId/follower')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(FollowSwagger.getUserFollows.operation)
  @ApiParam(FollowSwagger.getUserFollows.param.userId)
  @ApiResponse(FollowSwagger.getUserFollows.response[200])
  @ApiResponse(FollowSwagger.getUserFollows.response[401])
  async getFollowers(@Param('userId') userId: string) {
    return await this.followService.getFollowers(userId);
  }

  // 팔로잉 또는 팔로잉 상태 철회
  @Put(':otherId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(FollowSwagger.followOrCancel.operation)
  @ApiParam(FollowSwagger.followOrCancel.param.otherId)
  @ApiResponse(FollowSwagger.followOrCancel.response[200])
  @ApiResponse(FollowSwagger.followOrCancel.response[401])
  async followOrCancel(@Req() req: Request, @Param('otherId') otherId: string) {
    const { userId } = req.user as Payload;
    return await this.followService.followOrCancel(userId, otherId);
  }
}
