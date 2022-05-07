import {
  UserRepository,
  UserTokenRepository,
} from '../repository/user.repository';
import { JwtModule } from '../utils/jwt';

export class AuthService {
  private readonly userRepository = UserRepository;
  private readonly userTokenRepository = UserTokenRepository;

  public async kakaoLoginOrSignup(kakaoId: string) {
    let user = await this.userRepository.findOneBy({ kakaoId });
    if (!user) {
      user = this.userRepository.create({ kakaoId });
      await this.userRepository.save(user);
    }

    const payload = { kakaoId, userId: user.userId };
    const accessToken = JwtModule.createAccessToken(payload);
    const refreshToken = JwtModule.createRefreshToken();

    // refreshToken 저장
    return { accessToken, refreshToken };
  }

  public async verifyAccessToken(accessToken: string) {
    let payload = JwtModule.verifyAccessToken(accessToken);
  }
}
