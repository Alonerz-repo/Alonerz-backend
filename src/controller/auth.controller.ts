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
import { ApiOAuth2, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from 'src/dto/auth-login.dto';

@Controller('auth')
@ApiTags('사용자 인증 API')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @ApiOperation({
    summary: '카카오 API Redirect',
    description:
      '클라이언트에서 카카오 API로 로그인을 하면, 서버로 해당 사용자의 정보와 토큰이 넘어온다.',
  })
  @ApiOAuth2(['/'])
  @UseGuards(KakaoGuard)
  @Get('kakao')
  async kakao(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const kakaoId = req.user;
    const { clientUrl } = this.configService.get('auth');
    const redirectUrl = `${clientUrl}?kakaoId=${kakaoId}`;
    return res.redirect(redirectUrl);
  }

  @ApiOperation({
    summary: '사용자 로그인',
    description:
      '사용자 정보가 있으면 로그인, 없으면 회원가입으로 처리한 후 AccessToken과 RefreshToken을 보내준다.',
  })
  @Post('login')
  async login(@Body() body: AuthLoginDto) {
    const { kakaoId } = body;
    const result = await this.authService.loginOrSignup(kakaoId);
    return result;
  }
}
