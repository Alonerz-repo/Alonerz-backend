import { Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { KakaoAuthGuard } from './guards/kakao.auth.guard';
import { LocalAuthGuard } from './guards/local.auth.guard';
import { AuthService } from './auth.service';
import { UserKakaoDto } from './dto/user.kakao.dto';
import { KakaoPayload } from 'src/common/interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 토큰 유효성 검사
  @UseGuards(JwtAuthGuard)
  @Get()
  me(@Req() req: Request) {
    return req.user;
  }

  // 서비스 자체 로그인
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async serviceLogin(@Req() req: Request) {
    return this.authService.serviceLogin(req.user);
  }

  // 카카오 로그인 & 회원가입
  @UseGuards(KakaoAuthGuard)
  @Get('kakao')
  async kakaoLogin() {
    console.log(1);
    return;
  }

  // 카카오 RedirectURL
  @UseGuards(KakaoAuthGuard)
  @Get('kakao/redirect')
  async kakaoRedirect(@Req() req: Request) {
    const user: any = req.user;
    return await this.authService.kakaoLogin(user);
  }

  // 카카오 연결 끊기
  @Get('unlink')
  async kakaoUnlink(@Req() req: Request) {
    const accessToken = req.headers.authorization;
    return await this.authService.kakaoUnlink(accessToken);
  }

  // TODO : 카카오 이메일 정보 없는 경우
  // 다시 정보 이용 동의 요청하기
}
