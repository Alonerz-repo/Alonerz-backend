import { sign, verify, JwtPayload, decode } from 'jsonwebtoken';

export class JwtModule {
  private static readonly secret = process.env.JWT_SECRET;

  // [ Complete ] 서비스 자체 AccessToken 생성
  public static createAccessToken(payload: JwtPayload) {
    return sign(payload, this.secret, {
      expiresIn: '15m',
    });
  }

  // [ Complete ] 서비스 자체 RefreshToken 생성
  public static createRefreshToken() {
    return sign({}, this.secret);
  }

  // [ Complete ] 서비스 자체 AccessToken 인증
  public static verifyToken(accessToken: string) {
    return verify(accessToken, this.secret, {
      complete: true,
    });
  }

  // [ Complete ] 만료된 AccessToken 정보 확인
  public static decodeToken(accessToken: string) {
    return decode(accessToken) as JwtPayload;
  }
}
