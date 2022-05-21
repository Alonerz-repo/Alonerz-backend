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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthSwagger } from './auth.swagger';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthReissueDto } from './dto/auth-reissue.dto';

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
  @ApiOperation(AuthSwagger.auth.operation)
  @ApiResponse(AuthSwagger.auth.response[200])
  @ApiResponse(AuthSwagger.auth.response[401])
  async auth(@Req() req: Request) {
    return { auth: req.user };
  }

  // 카카오 로그인 RedirectURL
  @Get('kakao')
  @UseGuards(KakaoGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(AuthSwagger.kakao.operation)
  @ApiResponse(AuthSwagger.kakao.response[304])
  @ApiResponse(AuthSwagger.kakao.response[401])
  async kakao(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const kakaoId = req.user;
    const { clientUrl } = this.configService.get('auth');
    const redirectUrl = `${clientUrl}?kakaoId=${kakaoId}`;
    return res.redirect(redirectUrl);
  }

  // 서비스 로그인
  @Post('login')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody(AuthSwagger.login.body)
  @ApiOperation(AuthSwagger.login.operation)
  @ApiResponse(AuthSwagger.login.response[201])
  async login(@Body() authLoginDto: AuthLoginDto) {
    const { kakaoId } = authLoginDto;
    return await this.authService.loginOrSignup(kakaoId);
  }

  // 토큰 재발급
  @Post('reissue')
  @ApiBearerAuth('AccessToken')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody(AuthSwagger.reissue.body)
  @ApiOperation(AuthSwagger.reissue.operation)
  @ApiResponse(AuthSwagger.reissue.response[201])
  @ApiResponse(AuthSwagger.reissue.response[401])
  async reissue(@Req() req: Request, @Body() authReissueDto: AuthReissueDto) {
    const { authorization } = req.headers;
    const { refreshToken } = authReissueDto;
    return await this.authService.reissueTokens(authorization, refreshToken);
  }

  // 로그아웃
  @Delete('logout')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(AuthSwagger.logout.operation)
  @ApiResponse(AuthSwagger.logout.response[200])
  @ApiResponse(AuthSwagger.logout.response[401])
  async logout(@Req() req: Request) {
    const { authorization } = req.headers;
    const { userId } = req.user as Payload;
    return await this.authService.logout(userId, authorization);
  }

  // 계정 탈퇴
  @Delete('unlink')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(AuthSwagger.unlink.operation)
  @ApiResponse(AuthSwagger.logout.response[200])
  @ApiResponse(AuthSwagger.logout.response[401])
  async unlink(@Req() req: Request) {
    const { userId, kakaoId } = req.user as Payload;
    return await this.authService.unlink(userId, kakaoId);
  }
}
