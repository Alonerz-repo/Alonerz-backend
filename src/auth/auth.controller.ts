import {
  Controller,
  Get,
  Header,
  Inject,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Request, Response } from 'express';
import kakaoConfig from 'src/config/kakao.config';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(kakaoConfig.KEY)
    private readonly config: ConfigType<typeof kakaoConfig>,
    private readonly authService: AuthService,
  ) {}

  @Get('/kakao/login')
  @Header('Content-Type', 'text/html')
  kakaoLogin(@Res() res: Response): void {
    const hostName = 'https://kauth.kakao.com';
    const restApiKey = this.config.kakaoRestApiKey;
    const redirectUrl = this.config.kakaoRedirectUri;
    const url = `${hostName}/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUrl}&response_type=code`;
    return res.redirect(url);
  }

  @Get('/kakao/oauth')
  @Header('Content-Type', 'text/html')
  async kakaoOAuth(@Query('code') code: string, @Res() res: Response) {
    const restApiKey = this.config.kakaoRestApiKey;
    const redirectUrl = this.config.kakaoRedirectUri;
    const hostName = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${restApiKey}&redirect_uri=${redirectUrl}&code=${code}`;
    try {
      const response = await this.authService.login(hostName);
      const accessToken = response.data.access_token;
      const refreshToken = response.data.refresh_token;
      console.log(accessToken);
      console.log(refreshToken);
      res.cookie('koauth', accessToken);
      return res.send();
    } catch (e) {
      // console.log(e);
      return res.send('error');
    }
  }
  // 토큰 처리 확인 필요
  @Get('/kakao/me')
  async getKakaoProfile(@Req() req: Request) {
    const token = String(req.headers['authorization'][1]);
    console.log(token);
    return await this.authService.accessTokenInfo(token);
    // return this.authService.getProfile(token);
  }

  @Get('/kakao/logout')
  async kakaoLogout() {
    console.log(this.authService.accessToken);
    await this.authService.deleteLog();
    return;
  }
}
