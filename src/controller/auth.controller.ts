import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { AuthService } from 'src/service/auth.service';
import { KakaoGuard } from 'src/guard/kakao.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from 'src/dto/auth.dto';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('auth')
@ApiTags('사용자 인증 API')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @ApiOperation({
    summary: '사용자 토큰 인증 API',
    description:
      'AccessToken의 유효성을 검사합니다. 만약, 토큰이 만료되었다면 새로운 토큰 발급을 위한 응답을 보냅니다.',
  })
  @UseGuards(JwtGuard)
  @Get()
  async auth(@Req() req: Request) {
    return { auth: req.user };
  }

  @ApiOperation({
    summary: '카카오 API Redirect',
    description:
      '클라이언트에서 카카오 API로 로그인을 하면, 서버로 해당 사용자의 정보와 토큰이 넘어온다.',
  })
  @UseGuards(KakaoGuard)
  @Get('kakao')
  async kakao(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const kakaoId = req.user;
    // 개발 단계에서는 아래와 같이 설정
    // 배포 환경에서는 S3 URL로 연결
    const redirectUrl = `http://${req.connection.remoteAddress}:3000/redirect?kakaoId=${kakaoId}`;
    return res.redirect(redirectUrl);
  }

  @ApiOperation({
    summary: '사용자 로그인 API',
    description:
      '사용자 정보가 있으면 로그인, 없으면 회원가입으로 처리한 후 AccessToken과 RefreshToken을 보내준다.',
  })
  @Post('login')
  async login(@Body() body: AuthLoginDto) {
    const { kakaoId } = body;
    return await this.authService.loginOrSignup(kakaoId);
  }

  @ApiOperation({
    summary: '토큰 재발급 API',
    description:
      '기존의 AccessToken과 RefreshToken을 전달 받아 새로운 AccessToken과 RefreshToken을 발급합니다.',
  })
  @Patch('token')
  async reissue(@Req() req: Request, @Body() token: { refreshToken: string }) {
    const { authorization } = req.headers;
    const { refreshToken } = token;
    return await this.authService.reissueTokens(authorization, refreshToken);
  }
}
