import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/common/interfaces';
import { User } from './user.entity';
import { CreateCareerDto } from './dto/create.career.dto';
import { UpdateCareerDto } from './dto/update.career.dto';

@Controller('api/users')
export class UserController {
  constructor(private readonly service: UserService) {}

  // 내 정보 조회 API
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Req() req: Request): Promise<User> {
    const { kakaoId }: JwtPayload = req.user;
    return await this.service.me(kakaoId);
  }

  // 커리어 등록 API
  @UseGuards(JwtAuthGuard)
  @Post('career')
  async createCareer(
    @Req() req: Request,
    @Body() createCareerDto: CreateCareerDto,
  ): Promise<any> {
    const { kakaoId }: JwtPayload = req.user;
    return await this.service.createCareer(kakaoId, createCareerDto);
  }

  // 커리어 수정 API
  @UseGuards(JwtAuthGuard)
  @Patch('career/:id')
  async updateCareer(
    @Req() req: Request,
    @Param('id') careerId: number,
    @Body() updateCareerDto: UpdateCareerDto,
  ): Promise<any> {
    const { kakaoId }: JwtPayload = req.user;
    return await this.service.updateCareer(kakaoId, careerId, updateCareerDto);
  }

  // 커리어 삭제 API
  @UseGuards(JwtAuthGuard)
  @Delete('career/:id')
  async deleteCareer(
    @Req() req: Request,
    @Param('id') careerId: number,
  ): Promise<any> {
    const { kakaoId }: JwtPayload = req.user;
    return await this.service.deleteCareer(kakaoId, careerId);
  }
}
