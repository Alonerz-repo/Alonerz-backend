import { User } from 'src/user/user.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  // 카카오 로그인
  public async signinWithKakao(
    kakaoId: string,
  ): Promise<{ userId: number; kakaoId: string }> {
    const { userId } = await this.findOne(kakaoId);
    return { userId, kakaoId };
  }

  // 카카오 회원가입
  public async signupWithKakao(
    kakaoId: string,
  ): Promise<{ userId: number; kakaoId: string }> {
    const { userId } = await this.save({ kakaoId });
    return { userId, kakaoId };
  }

  // 로그인 한 사용자 정보
  public async whoAmI(userId: number, kakaoId: string): Promise<User> {
    return await this.findOne({ userId, kakaoId });
  }
}
