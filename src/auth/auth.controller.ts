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
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthSwagger } from './auth.swagger';
import { KakaoLoginDto } from './dto/request/kakao-login.dto';
import { ReissueTokneDto } from './dto/request/reissue-token.dto';
import { PayloadDto } from './dto/response/payload.dto';
import { CreatedTokensDto } from './dto/response/created-tokens.dto';
import { ReissuedTokensDto } from './dto/response/reissued-tokens.dto';

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
  @ApiResponse(AuthSwagger.auth.response[403])
  async auth(@Req() req: Request): Promise<PayloadDto> {
    const { userId } = req.user as Payload;
    return await this.authService.getPayload(userId);
  }

  // 카카오 로그인 RedirectURL
  @Get('kakao')
  @UseGuards(KakaoGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(AuthSwagger.kakaoRedirect.operation)
  @ApiResponse(AuthSwagger.kakaoRedirect.response[304])
  @ApiResponse(AuthSwagger.kakaoRedirect.response[401])
  kakaoRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): void {
    const kakaoId = req.user;
    const { clientUrl } = this.configService.get('auth');
    const redirectUrl = `${clientUrl}?kakaoId=${kakaoId}`;
    return res.redirect(redirectUrl);
  }

  // 서비스 로그인
  @Post('login')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation(AuthSwagger.login.operation)
  @ApiResponse(AuthSwagger.login.response[201])
  async login(@Body() kakaoLoginDto: KakaoLoginDto): Promise<CreatedTokensDto> {
    const { kakaoId } = kakaoLoginDto;
    return await this.authService.loginOrSignup(kakaoId);
  }

  // 토큰 재발급
  @Post('reissue')
  @ApiBearerAuth('AccessToken')
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiOperation(AuthSwagger.reissue.operation)
  @ApiResponse(AuthSwagger.reissue.response[201])
  @ApiResponse(AuthSwagger.reissue.response[401])
  async reissue(
    @Req() req: Request,
    @Body() reissueTokenDto: ReissueTokneDto,
  ): Promise<ReissuedTokensDto> {
    const { authorization } = req.headers;
    const { refreshToken } = reissueTokenDto;
    return await this.authService.reissueTokens(authorization, refreshToken);
  }

  // 로그아웃
  @Delete('logout')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(AuthSwagger.logout.operation)
  @ApiResponse(AuthSwagger.logout.response[200])
  async logout(@Req() req: Request): Promise<void> {
    const { userId } = req.user as Payload;
    return await this.authService.logout(userId);
  }
}
