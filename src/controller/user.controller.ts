import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
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
  @Get(':id')
  async getOtherProfile(@Param('id') userId: number) {
    return this.userService.findUserProfile(userId);
  }

  @ApiOperation({
    summary: '내 정보 수정 API',
    description: '내 정보를 수정합니다.',
  })
  @UseGuards(JwtGuard)
  @Patch('me')
  async editMyProfile(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { userId } = req.user as Payload;
    return this.userService.updateMyProfile(userId, updateUserDto);
  }
}
