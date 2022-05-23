import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/guard/jwt.guard';
import { jwtConfig } from 'src/common/configs';
import { KakaoStrategy } from 'src/auth/guard/kakao.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenRepository } from 'src/token/token.repository';
import { AuthException } from './auth.exception';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register(jwtConfig),
    TypeOrmModule.forFeature([AuthRepository, TokenRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, KakaoStrategy, AuthException],
})
export class AuthModule {}
