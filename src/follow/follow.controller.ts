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
  @Get(':userId/followings')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(FollowSwagger.getFollowings.operation)
  @ApiParam(FollowSwagger.getFollowings.param.userId)
  @ApiResponse(FollowSwagger.getFollowings.response[200])
  @ApiResponse(FollowSwagger.getFollowings.response[401])
  @ApiResponse(FollowSwagger.getFollowings.response[403])
  async getFollowings(@Param('userId') userId: string) {
    return await this.followService.getFollowings(userId);
  }

  // 사용자의 팔로워 목록 조회
  @Get(':userId/followers')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(FollowSwagger.getFollowers.operation)
  @ApiParam(FollowSwagger.getFollowers.param.userId)
  @ApiResponse(FollowSwagger.getFollowers.response[200])
  @ApiResponse(FollowSwagger.getFollowers.response[401])
  @ApiResponse(FollowSwagger.getFollowers.response[403])
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
  @ApiResponse(FollowSwagger.followOrCancel.response[403])
  async followOrCancel(@Req() req: Request, @Param('otherId') otherId: string) {
    const { userId } = req.user as Payload;
    return await this.followService.followOrCancel(userId, otherId);
  }
}
