import { Token } from 'src/entity/token.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {
  // 토큰 저장
  async saveToken(
    userId: number,
    kakaoId: string,
    tokens: { accessToken: string; refreshToken: string },
  ) {
    await this.save({ ...tokens, userId, kakaoId });
    return tokens;
  }

  // 토큰 조회
  async findToken(userId: number, kakaoId: string, refreshToken: string) {
    return await this.findOne({ userId, kakaoId, refreshToken });
  }

  // 토큰 삭제
  async deleteToken(userId: number, accessToken: string) {
    await this.delete({ userId, accessToken });
  }

  // 토큰 갱신
  async updateToken(
    userId: number,
    kakaoId: string,
    refreshToken: string,
    tokens: { accessToken: string; refreshToken: string },
  ) {
    await this.update({ userId, kakaoId, refreshToken }, tokens);
    return tokens;
  }
}
