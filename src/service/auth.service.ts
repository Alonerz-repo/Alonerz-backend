import { User } from '../entity/user.entity';
import {
  UserRepository,
  UserTokenRepository,
} from '../repository/user.repository';
import { JwtModule } from '../utils/jwt';

export class AuthService {
  private readonly userRepository = UserRepository;
  private readonly userTokenRepository = UserTokenRepository;

  // [ Complete ] : 카카오 id(kakaoId)로 회원가입 처리
  private async signupWithKakao(kakaoId: string): Promise<User> {
    const user = this.userRepository.create({ kakaoId });
    await this.userRepository.save(user);
    return user;
  }

  // [ Complete ] : 카카오 AccessToken으로 로그인 및 회원가입 처리
  public async loginWithKakao(kakaoId: string): Promise<{
    statusCode: number;
    tokens: { accessToken: string; refreshToken: string };
  }> {
    let statusCode = 200;
    let user = await this.userRepository.findOneBy({ kakaoId });
    if (!user) {
      statusCode = 201;
      user = await this.signupWithKakao(kakaoId);
    }

    const userId = user.userId;
    const payload = { kakaoId, userId };
    const tokens = {
      accessToken: JwtModule.createAccessToken(payload),
      refreshToken: JwtModule.createRefreshToken(),
    };

    await this.userTokenRepository.save({
      ...payload,
      ...tokens,
    });

    return { statusCode, tokens };
  }

  // [ Complete ] : 서비스 토큰 재발급
  public async reissueToken(userToken: {
    id: number;
    userId: number;
    kakaoId: string;
    refreshToken: string;
  }): Promise<{
    statusCode: number;
    tokens: { accessToken: string; refreshToken: string };
  }> {
    const { id, userId, kakaoId } = userToken;
    const payload = { userId, kakaoId };
    const tokens = {
      accessToken: JwtModule.createAccessToken(payload),
      refreshToken: JwtModule.createRefreshToken(),
    };

    await this.userTokenRepository.update(id, {
      ...tokens,
    });

    return { statusCode: 200, tokens };
  }
}
