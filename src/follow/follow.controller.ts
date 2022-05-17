import {
  Controller,
  Get,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { FollowType, Payload } from 'src/common/interface';
import { FollowService } from './follow.service';
import { FollowSwagger } from './follow.swagger';

@ApiTags(FollowSwagger.tag)
@Controller('follows')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  // 자신의 팔로잉 또는 팔로워 목록 조회
  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(FollowSwagger.routes.getMyFollows)
  @ApiQuery(FollowSwagger.query.type)
  @ApiResponse(FollowSwagger.response.getMyFollows[200])
  @ApiResponse(FollowSwagger.response.getMyFollows[401])
  async getMyFollows(
    @Req() req: Request,
    @Query('type') followType: FollowType,
  ) {
    const { userId } = req.user as Payload;
    return await this.followService.findFollows(userId, followType);
  }

  // 다른 사용자의 팔로잉 또는 팔로워 목록 조회
  @Get(':userId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(FollowSwagger.routes.getOtherFollows)
  @ApiParam(FollowSwagger.param.userId)
  @ApiQuery(FollowSwagger.query.type)
  @ApiResponse(FollowSwagger.response.getOtherFollows[200])
  @ApiResponse(FollowSwagger.response.getOtherFollows[401])
  async getOtherFollows(
    @Param('userId') userId: string,
    @Query('type') followType: FollowType,
  ) {
    return await this.followService.findFollows(userId, followType);
  }

  // 팔로잉 또는 팔로잉 상태 철회
  @Put(':otherId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(FollowSwagger.routes.followOrCancel)
  @ApiParam(FollowSwagger.param.otherId)
  @ApiResponse(FollowSwagger.response.followOrCancel[200])
  @ApiResponse(FollowSwagger.response.followOrCancel[401])
  async followOrCancel(@Req() req: Request, @Param('otherId') otherId: string) {
    const { userId } = req.user as Payload;
    return await this.followService.followOrCancel(userId, otherId);
  }
}
