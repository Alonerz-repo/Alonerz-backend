import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Token } from 'src/entity/token.entity';
import { Repository } from 'typeorm';
import { Payload } from 'src/common/interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
    private jwtService: JwtService,
  ) {}

  private generateAccessToken(payload: Payload) {
    return this.jwtService.sign(payload, { expiresIn: '1d' });
  }

  private generateRefreshToken() {
    return this.jwtService.sign({});
  }

  // 로그인(최초 로그인 시 회원가입 처리)
  async loginOrSignup(kakaoId: string) {
    let user: User;

    user = await this.userRepository.findOne({ kakaoId });
    if (!user) {
      user = await this.userRepository.save({ kakaoId });
    }
    const { userId, nickname } = user;
    const payload = { userId, kakaoId, nickname };
    const tokens = {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(),
    };

    const { careerId, year, description } = user;

    const needProfile = !careerId || !year || !description;

    await this.tokenRepository.save({ userId, kakaoId, ...tokens });
    return { needProfile, ...tokens };
  }

  // 토큰 재발급
  async reissueTokens(authorization: string, refreshToken: string) {
    const accessToken = (authorization || ' ').split(' ')[1];
    const { userId, kakaoId, nickname } = Object(
      this.jwtService.decode(accessToken),
    );

    const payload = { userId, kakaoId, nickname };
    const userToken = await this.tokenRepository.findOne({
      userId,
      kakaoId,
      refreshToken,
    });

    const tokens = {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(),
    };

    if (!userToken) {
      await this.tokenRepository.save({ userId, kakaoId, ...tokens });
    }

    await this.tokenRepository.update(
      { userId, kakaoId, refreshToken },
      { userId, kakaoId, ...tokens },
    );

    return { ...tokens, auth: payload };
  }

  // 로그아웃(accessToken 삭제)
  async logout(userId: number, authorization: string) {
    const accessToken = (authorization || ' ').split(' ')[1];
    return await this.tokenRepository.delete({ userId, accessToken });
  }
}
