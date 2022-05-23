import { EntityRepository, Repository } from 'typeorm';
import { Token } from './token.entity';

@EntityRepository(Token)
export class TokenRepository extends Repository<Token> {
  // 토큰 갱신 및 저장
  async saveToken(
    userId: string,
    tokens: { accessToken: string; refreshToken: string },
  ): Promise<void> {
    await this.save({ ...tokens, userId });
  }

  // 토큰 조회
  async findToken(userId: string, refreshToken: string): Promise<Token> {
    return await this.findOne({ userId, refreshToken });
  }

  // 토큰 삭제
  async deleteToken(userId: string): Promise<void> {
    await this.delete({ userId });
  }
}
