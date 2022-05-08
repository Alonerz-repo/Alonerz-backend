import { Request, Response } from 'express';
import { Controller, Post } from '../common/decorator/application';
import { AuthService } from '../service/auth.service';

@Controller('api/auth')
export class AuthController {
  private readonly authService = new AuthService();

  // 카카오 AccessToken으로 로그인, 회원가입
  @Post('kakao')
  public async loginOrSignupWithKakao(req: Request, res: Response) {
    const { accessToken } = req.body;
    return await this.authService.loginWithKakao(accessToken);
  }
}
