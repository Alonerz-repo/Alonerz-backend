import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { KakaoAuthGuard } from './guards/kakao.auth.guard';
import { AuthService } from './auth.service';
import { KakaoPayload } from 'src/common/interfaces';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
    return res.redirect(301, '//localhost:3000');
  }
}
