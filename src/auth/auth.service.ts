import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenRepository } from 'src/token/token.repository';
import { AuthException } from './auth.exception';
import { AuthRepository } from './auth.repository';
import { User } from 'src/user/user.entity';
import { Tokens } from './auth.interface';
import { Payload } from 'src/common/interface';
import { PayloadDto } from './dto/response/payload.dto';
import { CreatedTokensDto } from './dto/response/created-tokens.dto';
import { ReissuedTokensDto } from './dto/response/reissued-tokens.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    @InjectRepository(TokenRepository)
    private readonly tokenRepository: TokenRepository,
    private jwtService: JwtService,
    private authException: AuthException,
  ) {}

  // 계정 조회
  private async getUser(userId: string): Promise<User> {
    const user = await this.authRepository.findUserByUserId(userId);
    if (!user) {
      this.authException.NotFound();
    }
    return user;
  }

  // 토큰 쌍 생성
  private generateTokens(userId: string): Tokens {
    const payload = { userId };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign({});
    return { accessToken, refreshToken };
  }

  // 페이로드 조회
  async getPayload(userId: string): Promise<PayloadDto> {
    const user = await this.getUser(userId);
    return new PayloadDto(user);
  }

  // 로그인(최초 로그인 시 회원가입 처리)
  async loginOrSignup(kakaoId: string): Promise<CreatedTokensDto> {
    const exist = await this.authRepository.findUserByKakaoId(kakaoId);
    const user = exist ? exist : await this.authRepository.createUser(kakaoId);
    const tokens = this.generateTokens(user.userId);
    await this.tokenRepository.saveToken(user.userId, tokens);
    return new CreatedTokensDto(tokens);
  }

  // 토큰 갱신
  async reissueTokens(
    authorization: string,
    refreshToken: string,
  ): Promise<ReissuedTokensDto> {
    const accessToken = (authorization || ' ').split(' ')[1];
    const { userId } = this.jwtService.decode(accessToken) as Payload;
    if (!userId) {
      this.authException.InvalidToken();
    }
    const user = await this.getUser(userId);
    const tokens = this.generateTokens(userId);
    await this.tokenRepository.updateToken(userId, refreshToken, tokens);
    return new ReissuedTokensDto(tokens, user);
  }

  // 로그아웃(accessToken 삭제)
  async logout(userId: string): Promise<void> {
    await this.tokenRepository.deleteToken(userId);
    return;
  }
}
