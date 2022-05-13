import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { KakaoGuard } from 'src/auth/guard/kakao.guard';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Payload } from 'src/common/interface';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthLoginDto, RefreshTokenDto } from './auth.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthSwagger } from './auth.swagger';

@ApiTags(AuthSwagger.tag)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  // 사용자 인가 확인
  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(AuthSwagger.routes.auth)
  @ApiResponse(AuthSwagger.response.auth[200])
  @ApiResponse(AuthSwagger.response.auth[401])
  async auth(@Req() req: Request) {
    return { auth: req.user };
  }

  // 카카오 로그인 RedirectURL
  @Get('kakao')
  @UseGuards(KakaoGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(AuthSwagger.routes.kakao)
  @ApiResponse(AuthSwagger.response.kakao[304])
  @ApiResponse(AuthSwagger.response.kakao[401])
  async kakao(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const kakaoId = req.user;
    const { clientUrl } = this.configService.get('auth');
    const redirectUrl = `${clientUrl}?kakaoId=${kakaoId}`;
    return res.redirect(redirectUrl);
  }

  // 서비스 로그인
  @Post('login')
  @ApiOperation(AuthSwagger.routes.login)
  @ApiResponse(AuthSwagger.response.login[201])
  @ApiResponse(AuthSwagger.response.login[401])
  async login(@Body() body: AuthLoginDto) {
    const { kakaoId } = body;
    return await this.authService.loginOrSignup(kakaoId);
  }

  // 토큰 재발급
  @Post('reissue')
  @ApiBearerAuth('AccessToken')
  @ApiOperation(AuthSwagger.routes.reissue)
  @ApiResponse(AuthSwagger.response.reissue[201])
  @ApiResponse(AuthSwagger.response.reissue[401])
  async reissue(@Req() req: Request, @Body() refreshTokenDto: RefreshTokenDto) {
    const { authorization } = req.headers;
    const { refreshToken } = refreshTokenDto;
    return await this.authService.reissueTokens(authorization, refreshToken);
  }

  // 로그아웃
  @Delete('logout')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(AuthSwagger.routes.logout)
  @ApiResponse(AuthSwagger.response.logout[200])
  @ApiResponse(AuthSwagger.response.logout[401])
  async logout(@Req() req: Request) {
    const { authorization } = req.headers;
    const { userId } = req.user as Payload;
    return await this.authService.logout(userId, authorization);
  }
}
