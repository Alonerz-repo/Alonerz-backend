import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { KakaoAuthGuard } from './guards/kakao.auth.guard';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { AuthService } from './auth.service';
import { JwtPayload, KakaoPayload } from 'src/common/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 토큰 유효성 검사 및 현재 사용자 정보 가져오기
  @UseGuards(JwtAuthGuard)
  @Get()
  async me(@Req() req: Request) {
    const jwtPayload: JwtPayload = req.user;
    const user = await this.authService.getCurrentUser(jwtPayload);
    return user;
  }

  // React -> Kakao API -> 서버(RedirectURL)
  @UseGuards(KakaoAuthGuard)
  @Get('kakao/redirect')
  async kakaoRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const kakaoPayload: KakaoPayload = req.user;
    const { accessToken } = await this.authService.kakaoSignupOrLogin(
      kakaoPayload,
    );
    res.cookie('token', accessToken);
    // TODO : redirect 경로 설정 필요
    return res.redirect(301, '//localhost:3000');
  }
}
