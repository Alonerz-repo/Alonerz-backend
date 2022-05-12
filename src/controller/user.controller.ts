import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Request } from 'express';
import { FollowFilter, Payload } from 'src/common/interface';
import { UpdateUserDto } from 'src/dto/user.dto';
import { JwtGuard } from 'src/guard/jwt.guard';
import { UserService } from 'src/service/user.service';
import { UserOperation, UserTag } from 'src/swagger/operation/user.operation';
import { UserParam } from 'src/swagger/param/user.param';
import { UserQuery } from 'src/swagger/query/user.query';

@ApiTags(UserTag)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(JwtGuard)
  @ApiOperation(UserOperation.getMyProfile)
  @ApiBearerAuth('AccessToken')
  async getMyProfile(@Req() req: Request) {
    const { userId } = req.user as Payload;
    return this.userService.getUserProfile(userId);
  }

  @Get(':userId')
  @UseGuards(JwtGuard)
  @ApiOperation(UserOperation.getOtherProfile)
  @ApiBearerAuth('AccessToken')
  @ApiParam(UserParam.userId)
  async getOtherProfile(@Param('userId') userId: number) {
    return this.userService.getUserProfile(userId);
  }

  @Patch('me')
  @UseGuards(JwtGuard)
  @ApiOperation(UserOperation.editMyProfile)
  @ApiBearerAuth('AccessToken')
  async editMyProfile(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    const { userId } = req.user as Payload;
    return this.userService.updateMyProfile(userId, updateUserDto);
  }

  @Get('followings/:userId')
  @UseGuards(JwtGuard)
  @ApiOperation(UserOperation.getUserFollowings)
  @ApiBearerAuth('AccessToken')
  @ApiParam(UserParam.userId)
  @ApiQuery(UserQuery.filter)
  async getUserFollowings(
    @Param('userId') userId: number,
    @Query('filter') filter: FollowFilter,
  ) {
    return await this.userService.findUserFollows(userId, filter);
  }

  @Put('follow/:otherId')
  @UseGuards(JwtGuard)
  @ApiOperation(UserOperation.followingOtherOrCancel)
  @ApiBearerAuth('AccessToken')
  @ApiParam(UserParam.otherId)
  async followingOtherOrCancel(
    @Req() req: Request,
    @Param('otherId') otherId: number,
  ): Promise<void> {
    const { userId } = req.user as Payload;
    return await this.userService.followingOtherOrCancel(userId, otherId);
  }

  @Get('blocks/me')
  @UseGuards(JwtGuard)
  @ApiOperation(UserOperation.getUserBlocks)
  @ApiBearerAuth('AccessToken')
  async getUserBlocks(@Req() req: Request) {
    const { userId } = req.user as Payload;
    return await this.userService.getUserBlocks(userId);
  }

  @Put('block/:otherId')
  @UseGuards(JwtGuard)
  @ApiOperation(UserOperation.blockOtherOrCancel)
  @ApiBearerAuth('AccessToken')
  @ApiParam(UserParam.otherId)
  async blockOtherOrCancel(
    @Req() req: Request,
    @Param('otherId') otherId: number,
  ): Promise<void> {
    const { userId } = req.user as Payload;
    return await this.userService.blockOtherOrCancel(userId, otherId);
  }
}
