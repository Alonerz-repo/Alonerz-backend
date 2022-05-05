import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { UserModule } from '../user/user.module';
import { AuthException } from './auth.exception';
import { JwtStrategy } from './strategies/jwt.strategy';
import { KakaoStrategy } from './strategies/kakao.strategy';
import { configs } from 'src/common/configs';

const { secret, expiresIn } = configs.jwt;

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: secret,
      signOptions: { expiresIn: expiresIn },
    }),
    TypeOrmModule.forFeature([AuthRepository]),
    UserModule,
  ],
  providers: [AuthService, AuthException, JwtStrategy, KakaoStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
