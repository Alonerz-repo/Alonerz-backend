import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { Request } from 'express';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
