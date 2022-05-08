import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthService } from 'src/service/auth.service';
import { KakaoGuard } from 'src/guard/kakao.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  // 클라이언트로부터 Kakao Code 전달 받고
  // Passport를 통해 kakaoId 조회
  @UseGuards(KakaoGuard)
  @Get('kakao')
  async kakao(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const kakaoId = req.user;
    const { clientUrl } = this.configService.get('auth');
    const redirectUrl = `${clientUrl}?kakaoId=${kakaoId}`;
    return res.redirect(redirectUrl);
  }

  @Post('login')
  async login(@Body() body) {
    const { kakaoId } = body;
  }
}
