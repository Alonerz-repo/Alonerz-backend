import { Request, Response } from 'express';
import { AuthService } from '../service/auth.service';

export class AuthController {
  private readonly authService = new AuthService();

  // 카카오 AccessToken으로 로그인, 회원가입
  public async loginOrSignupWithKakao(req: Request, res: Response) {
    const { accessToken } = req.body;
    return await this.authService.loginWithKakao(accessToken);
  }
}
