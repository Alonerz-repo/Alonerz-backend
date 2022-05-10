import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { Payload } from 'src/common/interface';
import { UpdateUserDto } from 'src/dto/user.dto';
import { JwtGuard } from 'src/guard/jwt.guard';
import { UserService } from 'src/service/user.service';

@ApiTags('사용자 정보 API')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: '내 정보 조회 API',
    description: 'AccessToken으로 내 정보를 조회합니다.',
  })
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtGuard)
  @Get('me')
  async getMyProfile(@Req() req: Request) {
    const { userId } = req.user as Payload;
    return this.userService.findUserProfile(userId);
  }

  @ApiOperation({
    summary: '다른 사용자 정보 조회 API',
    description: '다른 사용자 정보를 조회합니다.',
  })
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtGuard)
  @Get(':userId')
  async getOtherProfile(@Param('userId') userId: number) {
    return this.userService.findUserProfile(userId);
  }

  @ApiOperation({
    summary: '내 정보 수정 API',
    description: '내 정보를 수정합니다.',
  })
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtGuard)
  @Patch('me')
  async editMyProfile(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    const { userId } = req.user as Payload;
    return this.userService.updateMyProfile(userId, updateUserDto);
  }

  @ApiOperation({
    summary: '사용자 팔로잉 목록 조회 API',
    description: '사용자의 팔로잉 목록을 조회합니다.',
  })
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtGuard)
  @Get('followings/:userId')
  async getUserFollowings(@Param('userId') userId: number) {
    return await this.userService.findUserFollowings(userId);
  }

  @ApiOperation({
    summary: '사용자 팔로워 목록 조회 API',
    description: '사용자의 팔로워 목록을 조회합니다.',
  })
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtGuard)
  @Get('followers/:userId')
  async getUserFollowers(@Param('userId') userId: number) {
    return await this.userService.findUserFollowers(userId);
  }

  @ApiOperation({
    summary: '다른 사용자 팔로잉/취소 API',
    description: '다른 사용자를 팔로잉하거나, 팔로잉한 상태를 취소합니다.',
  })
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtGuard)
  @Put('follow/:followUserId')
  async followingOtherOrCancel(
    @Req() req: Request,
    @Param('followUserId') followUserId: number,
  ): Promise<void> {
    const { userId } = req.user as Payload;
    return await this.userService.followingOtherOrCancel(userId, followUserId);
  }

  @ApiOperation({
    summary: '나의 차단 목록 조회 API',
    description: '자신의 차단 목록을 조회합니다.',
  })
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtGuard)
  @Get('blocks/me')
  async getMyBlocks(@Req() req: Request) {
    const { userId } = req.user as Payload;
    return await this.userService.getMyBlockings(userId);
  }

  @ApiOperation({
    summary: '다른 사용자 차단/취소 API',
    description:
      '다른 사용자를 차단 목록에 추가하거나, 차단 목록에서 제외시킵니다.',
  })
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtGuard)
  @Put('block/:blockUserId')
  async blockOtherOrCancel(
    @Req() req: Request,
    @Param('blockUserId') blockUserId: number,
  ): Promise<void> {
    const { userId } = req.user as Payload;
    return await this.userService.blockOtherOrCancel(userId, blockUserId);
  }
}
