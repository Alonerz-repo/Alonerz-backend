import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/common/interfaces';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('api/users')
export class UserController {
  constructor(private readonly service: UserService) {}

  // 다른 사용자 정보 조회 API
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async otherUserInfo(@Param('id') userId: number) {
    return await this.service.otherUserInfo(userId);
  }

  // 내 정보 수정(닉네임, 프로필 이미지 URL)
  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateProfile(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { userId, kakaoId }: JwtPayload = req.user;
    this.service.updateProfile(userId, kakaoId, updateUserDto);
  }
}
