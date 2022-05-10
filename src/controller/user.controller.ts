import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { Payload } from 'src/common/interface';
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
  async me(@Req() req: Request) {
    const user = req.user;
    return this.userService.getMyProfile(user as Payload);
  }

  @ApiOperation({
    summary: '다른 사용자 정보 조회 API',
    description: '다른 사용자 정보를 조회합니다.',
  })
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtGuard)
  @Get(':id')
  async other(@Param('id') userId: number) {
    return this.userService.getOtherProfile(userId);
  }
}
