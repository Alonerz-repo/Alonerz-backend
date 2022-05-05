import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { KakaoAuthGuard } from './guards/kakao.auth.guard';
import { AuthService } from './auth.service';
import { KakaoPayload } from 'src/common/interfaces';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { JwtPayload } from 'jsonwebtoken';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Kakao API Redirect 응답
  @UseGuards(KakaoAuthGuard)
  @Get('kakao/redirect')
  public async kakaoRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { kakaoId }: KakaoPayload = req.user;
    const { accessToken, refreshToken } =
      await this.authService.kakaoLoginOrSignup(kakaoId);
    console.log(kakaoId);
    res.cookie('accessToken', accessToken);
    res.cookie('refreshToken', refreshToken);
    return res.redirect(301, '//localhost:3000');
  }

  // 현재 접속한 사용자 정보
  @UseGuards(JwtAuthGuard)
  @Get()
  public async whoAmI(@Req() req: Request) {
    const { userId, kakaoId }: JwtPayload = req.user;
    return await this.authService.whoAmI(userId, kakaoId);
  }
}
