import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserToken } from 'src/entity/user-token.entity';
import { Repository } from 'typeorm';
import { Payload } from 'src/common/interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserToken)
    private readonly userTokenRepository: Repository<UserToken>,
    private jwtService: JwtService,
  ) {}

  private generateAccessToken(payload: Payload) {
    return this.jwtService.sign(payload, { expiresIn: '1d' });
  }

  private generateRefreshToken() {
    return this.jwtService.sign({});
  }

  async loginOrSignup(kakaoId: string) {
    let user: User;
    let isSignup = false;

    user = await this.userRepository.findOne({ kakaoId });
    if (!user) {
      user = await this.userRepository.save({ kakaoId });
      isSignup = true;
    }
    const { userId, nickname } = user;
    const payload = { userId, kakaoId, nickname };
    const tokens = {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(),
    };

    await this.userTokenRepository.save({ userId, kakaoId, ...tokens });
    return { isSignup, ...tokens };
  }

  async reissueTokens(authorization: string, refreshToken: string) {
    const accessToken = (authorization || ' ').split(' ')[1];
    const { userId, kakaoId, nickname } = Object(
      this.jwtService.decode(accessToken),
    );

    const payload = { userId, kakaoId, nickname };
    const userToken = await this.userTokenRepository.findOne({
      userId,
      kakaoId,
      refreshToken,
    });

    const tokens = {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(),
    };

    if (!userToken) {
      await this.userTokenRepository.save({ userId, kakaoId, ...tokens });
    }

    await this.userTokenRepository.update(
      { userId, kakaoId, refreshToken },
      { userId, kakaoId, ...tokens },
    );

    return { ...tokens, auth: payload };
  }
}
