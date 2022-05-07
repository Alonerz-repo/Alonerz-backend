import {
  UserRepository,
  UserTokenRepository,
} from '../repository/user.repository';
import { JwtModule } from '../utils/jwt';
import { KakaoAPI } from '../utils/kakao';

export class AuthService {
  private readonly userRepository = UserRepository;
  private readonly userTokenRepository = UserTokenRepository;

  // 카카오 AccessToken으로 사용자 정보 조회
  private async validateKakaoToken(kakaoToken: string): Promise<string> {
    const { id } = await KakaoAPI.validate(kakaoToken);
    if (!id) throw Error('카카오 토큰 인증 실패');
    return id;
  }

  // 카카오 id(kakaoId)로 회원가입 처리
  private async signupWithKakao(kakaoId: string) {
    const user = this.userRepository.create({ kakaoId });
    await this.userRepository.save(user);
    return user.userId;
  }

  // 카카오 AccessToken으로 로그인 및 회원가입 처리
  public async loginWithKakao(kakaoToken: string) {
    const kakaoId = await this.validateKakaoToken(kakaoToken);
    const user = await this.userRepository.findOneBy({ kakaoId });
    const userId = !user ? await this.signupWithKakao(kakaoId) : user.userId;
    const payload = { kakaoId, userId: userId };
    const accessToken = JwtModule.createAccessToken(payload);
    const refreshToken = JwtModule.createRefreshToken();
    await this.userTokenRepository.save({ ...payload, refreshToken });
    return { alonerz_access: accessToken, alonerz_refresh: refreshToken };
  }

  // 서비스 자체 AccessToken 유효성 검사
  public async verifyAccessToken(accessToken: string) {
    let payload = JwtModule.verifyAccessToken(accessToken);
  }
}
