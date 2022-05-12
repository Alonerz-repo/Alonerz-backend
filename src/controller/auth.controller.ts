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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthLoginDto, RefreshTokenDto } from 'src/dto/auth.dto';
import { JwtGuard } from 'src/guard/jwt.guard';
import { Payload } from 'src/common/interface';
import { ConfigService } from '@nestjs/config';
import { AuthOperations, AuthTag } from 'src/swagger/operation/auth.operation';
import { AuthResponse } from 'src/swagger/response/auth.response';

@ApiTags(AuthTag)
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(AuthOperations.auth)
  @ApiOkResponse(AuthResponse.auth.ok)
  @ApiUnauthorizedResponse(AuthResponse.auth.unauthorized)
  @ApiForbiddenResponse(AuthResponse.auth.forbidden)
  async auth(@Req() req: Request) {
    return { auth: req.user };
  }

  @Get('kakao')
  @UseGuards(KakaoGuard)
  @ApiOperation(AuthOperations.kakao)
  @ApiResponse(AuthResponse.kakao.redirect)
  async kakao(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const kakaoId = req.user;
    const { clientUrl } = this.configService.get('auth');
    const redirectUrl = `${clientUrl}?kakaoId=${kakaoId}`;
    return res.redirect(redirectUrl);
  }

  @Post('login')
  @ApiOperation(AuthOperations.login)
  @ApiCreatedResponse(AuthResponse.login.created)
  async login(@Body() body: AuthLoginDto) {
    const { kakaoId } = body;
    return await this.authService.loginOrSignup(kakaoId);
  }

  @Patch('token')
  @ApiBearerAuth('AccessToken')
  @ApiOperation(AuthOperations.reissue)
  @ApiOkResponse(AuthResponse.token.ok)
  async reissue(@Req() req: Request, @Body() refreshTokenDto: RefreshTokenDto) {
    const { authorization } = req.headers;
    const { refreshToken } = refreshTokenDto;
    return await this.authService.reissueTokens(authorization, refreshToken);
  }

  @Delete('logout')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('AccessToken')
  @ApiOperation(AuthOperations.logout)
  @ApiOkResponse(AuthResponse.logout.ok)
  async logout(@Req() req: Request) {
    const { authorization } = req.headers;
    const { userId } = req.user as Payload;
    return await this.authService.logout(userId, authorization);
  }
}
