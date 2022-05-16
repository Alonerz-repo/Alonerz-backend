import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { Payload } from 'src/common/interface';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserSwagger } from './user.swagger';

@ApiTags(UserSwagger.tag)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // 자신의 프로필 조회
  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiResponse(UserSwagger.response.getMyProfile[200])
  @ApiResponse(UserSwagger.response.getMyProfile[401])
  async getMyProfile(@Req() req: Request) {
    const { userId } = req.user as Payload;
    return this.userService.getUserProfile(userId, userId);
  }

  // 다른 사용자의 프로필 조회
  @Get(':otherId')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiParam(UserSwagger.param.userId)
  @ApiResponse(UserSwagger.response.getOtherProfile[200])
  @ApiResponse(UserSwagger.response.getOtherProfile[401])
  async getOtherProfile(
    @Req() req: Request,
    @Param('otherId') otherId: number,
  ) {
    const { userId } = req.user as Payload;
    return this.userService.getUserProfile(userId, otherId);
  }

  // 자신의 프로필 정보 수정
  @Patch()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiResponse(UserSwagger.response.editMyProfile[200])
  @ApiResponse(UserSwagger.response.editMyProfile[401])
  async editMyProfile(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { userId } = req.user as Payload;
    return this.userService.updateMyProfile(userId, updateUserDto);
  }
}
