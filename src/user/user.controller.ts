import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { Request } from 'express';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  signup(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.userService.serviceSignup(createUserDto);
  }

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
