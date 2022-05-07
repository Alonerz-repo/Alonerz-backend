import { sign, verify, JwtPayload } from 'jsonwebtoken';

export class JwtModule {
  private static readonly secret = process.env.JWT_SECRET;

  public static createAccessToken(payload: JwtPayload) {
    return sign(payload, this.secret, {
      expiresIn: '15m',
    });
  }

  public static createRefreshToken() {
    return sign({}, this.secret);
  }

  public static verifyAccessToken(accessToken: string) {
    return verify(accessToken, this.secret, {
      complete: true,
    });
  }
}
