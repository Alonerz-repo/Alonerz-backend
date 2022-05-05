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
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { CareerService } from './career.service';
import { CreateCareerDto } from './dto/create.career.dto';
import { UpdateCareerDto } from './dto/update.career.dto';

@Controller('api/careers')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  // 다른 사용자 커리어 정보 조회
  @UseGuards(JwtAuthGuard)
  @Get()
  public async getMyCareers(@Req() req: Request) {
    const { userId }: JwtPayload = req.user;
    const careers = await this.careerService.getCareers(userId);
    return { careers };
  }

  // 사용자 커리어 정보 조회
  @Get(':userId')
  public async getOtherCareers(@Param('userId') userId: number) {
    const careers = await this.careerService.getCareers(userId);
    return { careers };
  }

  // 사용자 커리어 정보 추가
  @UseGuards(JwtAuthGuard)
  @Post()
  public async createMyCareer(
    @Req() req: Request,
    @Body() createCareetDto: CreateCareerDto,
  ) {
    const { userId }: JwtPayload = req.user;
    const carrerId = await this.careerService.createMyCareer(
      userId,
      createCareetDto,
    );
    return { carrerId };
  }

  // 사용자 커리어 정보 수정
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  public async updateMyCareer(
    @Param('id') careerId: number,
    updateCareerDto: UpdateCareerDto,
  ): Promise<void> {
    await this.careerService.updateCareer(careerId, updateCareerDto);
  }

  // 사용자 커리어 정보 삭제
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async deleteMyCareer(@Param('id') careerId: number): Promise<void> {
    await this.careerService.deleteCareer(careerId);
  }
}
