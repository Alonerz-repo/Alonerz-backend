import { Request, Response } from 'express';
import {
  Controller,
  Delete,
  Get,
  Middleware,
  Post,
} from '../common/decorator/application';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { AuthService } from '../service/auth.service';

// [ TODO ] : 의존성 주입 필요
const authService = new AuthService();

@Controller('/api/auth')
export class AuthController {
  // [ Complete ] : 카카오 AccessToken으로 로그인, 회원가입
  @Post('/kakao')
  @Middleware(AuthMiddleware.validKakaoToken)
  public async loginOrSignupWithKakao(_: Request, res: Response) {
    const { kakaoId } = res.locals;
    const { statusCode, tokens } = await authService.loginWithKakao(kakaoId);
    return res.status(statusCode).json(tokens);
  }

  // [ Complete ] : 토큰 유효성 검사
  @Get()
  @Middleware(AuthMiddleware.validateServiceToken)
  public async authorized(_: Request, res: Response) {
    const { user } = res.locals;
    return res.status(200).json({
      userId: user.userId,
      kakaoId: user.kakaoId,
    });
  }

  // [ Complete ] : 토큰 재발급
  @Get('/refresh')
  @Middleware(AuthMiddleware.validateServiceTokens)
  public async reissueToken(_: Request, res: Response) {
    const { userToken } = res.locals;
    const { statusCode, tokens } = await authService.reissueToken(userToken);
    console.log(tokens);
    return res.status(statusCode).json(tokens);
  }

  // [ Complete ] : 로그아웃
  @Delete('/logout')
  @Middleware(AuthMiddleware.deleteServiceTokens)
  public async logout(_: Request, res: Response) {
    return res.status(200).send();
  }
}
