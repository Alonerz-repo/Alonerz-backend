import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { KakaoAuthGuard } from './guards/kakao.auth.guard';
import { AuthService } from './auth.service';
import { KakaoPayload } from 'src/common/interfaces';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { JwtPayload } from 'jsonwebtoken';
import { configs } from 'src/common/configs';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 클라이언트에게 Kakao Code 전달 받고
  @UseGuards(KakaoAuthGuard)
  @Get('kakao/redirect')
  public async kakaoRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { kakaoId }: KakaoPayload = req.user;
    return res.redirect(`${configs.kakao.clientURL}?kakaoId=${kakaoId}`);
  }

  // 사용자 로그인 및 회원가입 처리
  @Get('/kakao/login')
  public async kakaoLoginOrSignup(@Query('kakaoId') kakaoId: string) {
    return await this.authService.kakaoLoginOrSignup(kakaoId);
  }

  // 현재 접속한 사용자 정보
  @UseGuards(JwtAuthGuard)
  @Get()
  public async whoAmI(@Req() req: Request) {
    const { userId, kakaoId }: JwtPayload = req.user;
    return await this.authService.whoAmI(userId, kakaoId);
  }
}
