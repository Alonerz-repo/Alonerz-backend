import { AuthException } from '../common/exception/auth.exception';
import { JwtModule } from '../utils/jwt';
import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { KakaoAPI } from '../utils/kakao';
import { UserTokenRepository } from '../repository/user.repository';

export class AuthMiddleware {
  // [ Complete ] Kakao AccessToken으로 카카오 정보 조회
  public static async validKakaoToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { kakaoAccessToken } = req.body;
    if (!kakaoAccessToken) {
      return AuthException.invalidToken(res);
    }

    const { id } = await KakaoAPI.validate(kakaoAccessToken);
    if (!id) {
      return AuthException.unauthorized(res);
    }

    res.locals.kakaoId = id;
    next();
  }

  // [ Complete ] 토큰 유효성 검사
  public static async validateServiceToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { authorization } = req.headers;

    const bearerToken = authorization || ' ';
    const accessToken = bearerToken.split(' ')[1];

    try {
      const { payload }: JwtPayload = JwtModule.verifyToken(accessToken);

      const user = await UserTokenRepository.findOneBy({
        userId: payload.userId,
        kakaoId: payload.kakaoId,
      });

      if (!user) {
        return AuthException.notfound(res);
      }

      res.locals.user = payload;
      next();
    } catch (error) {
      switch (error.message) {
        case 'invalid token':
        case 'jwt malformed':
          return AuthException.invalidToken(res);
        case 'jwt expired':
          return AuthException.expiredToken(res);
        default:
          return AuthException.unknownError(res);
      }
    }
  }

  // [ Complete ] 토큰 재발급 전에 토큰 정보 확인
  public static async validateServiceTokens(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { authorization, refreshtoken } = req.headers;

    const bearerToken = authorization || ' ';
    const accessToken = bearerToken.split(' ')[1];
    const refreshToken = String(refreshtoken);

    if (!accessToken || !refreshtoken) {
      return AuthException.badRequest(res);
    }

    const { userId, kakaoId } = JwtModule.decodeToken(accessToken);
    if (!userId || !kakaoId) {
      return AuthException.badRequest(res);
    }

    const userToken = await UserTokenRepository.findOneBy({
      userId,
      kakaoId,
      refreshToken,
    });

    if (!userToken) {
      return AuthException.notfound(res);
    }

    res.locals.userToken = userToken;
    next();
  }

  // [ Complete ] 사용자 토큰 정보를 삭제하여 안전하게 로그아웃 처리
  public static async deleteServiceTokens(
    req: Request,
    _: Response,
    next: NextFunction
  ) {
    const { authorization, refreshtoken } = req.headers;

    const bearerToken = authorization || ' ';
    const accessToken = bearerToken.split(' ')[1];
    const refreshToken = String(refreshtoken);

    try {
      const payload = JwtModule.decodeToken(accessToken);
      const { userId, kakaoId } = payload;
      await UserTokenRepository.delete({
        userId,
        kakaoId,
        refreshToken,
      });
      next();
    } catch (error) {
      next();
    }
  }
}
