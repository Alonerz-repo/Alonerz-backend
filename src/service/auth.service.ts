import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserToken } from 'src/entity/user-token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserToken)
    private readonly userTokenRepository: Repository<UserToken>,
    private jwtService: JwtService,
  ) {}

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
      accessToken: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refreshToken: this.jwtService.sign({}, { expiresIn: '20d' }),
    };

    await this.userTokenRepository.save({ userId, kakaoId, ...tokens });
    return { isSignup, ...tokens };
  }
}
