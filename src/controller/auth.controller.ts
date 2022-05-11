import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from 'src/service/auth.service';
import { KakaoGuard } from 'src/guard/kakao.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto, RefreshTokenDto } from 'src/dto/auth.dto';
import { JwtGuard } from 'src/guard/jwt.guard';
import { Payload } from 'src/common/interface';
import { ConfigService } from '@nestjs/config';

@ApiTags('사용자 인증 API')
@Controller('auth')
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
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtGuard)
  @Get()
  async auth(@Req() req: Request) {
    return { auth: req.user };
  }

  @ApiOperation({
    summary: '카카오 로그인 API Redirect',
    description:
      '클라이언트에서만 동작하며, 카카오 API로 로그인을 하면, 서버로 해당 사용자의 정보와 토큰이 넘어옵니다.',
  })
  @UseGuards(KakaoGuard)
  @Get('kakao')
  async kakao(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const kakaoId = req.user;
    const { clientUrl } = this.configService.get('auth');
    const redirectUrl = `${clientUrl}?kakaoId=${kakaoId}`;
    return res.redirect(redirectUrl);
  }

  @ApiOperation({
    summary: '사용자 로그인 API',
    description:
      '사용자 정보가 있으면 로그인, 없으면 회원가입으로 처리한 후 AccessToken과 RefreshToken을 보내줍니다.',
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
  @ApiBearerAuth('AccessToken')
  @Patch('token')
  async reissue(@Req() req: Request, @Body() refreshTokenDto: RefreshTokenDto) {
    const { authorization } = req.headers;
    const { refreshToken } = refreshTokenDto;
    return await this.authService.reissueTokens(authorization, refreshToken);
  }

  @ApiOperation({
    summary: '로그아웃 API',
    description:
      '데이터베이스에서 사용자의 AccessToken과 RefreshToken을 삭제합니다.',
  })
  @ApiBearerAuth('AccessToken')
  @UseGuards(JwtGuard)
  @Delete('logout')
  async logout(@Req() req: Request) {
    const { authorization } = req.headers;
    const { userId } = req.user as Payload;
    return await this.authService.logout(userId, authorization);
  }
}
