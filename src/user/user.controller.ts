import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { Request } from 'express';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // TODO : Kakao 계정으로만 사용하는 경우 제거
  // 그렇지 않으면 AuthController로 옮길 것
  @Post()
  signup(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.serviceSignup(createUserDto);
  }

  // TODO : Type 지정 및 수정하려는 데이터 수정
  @UseGuards(JwtAuthGuard)
  @Patch()
  update(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<any> {
    const user: any = req.user;
    return this.userService.update(user.userId, updateUserDto);
  }
}
