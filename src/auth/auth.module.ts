import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/guard/jwt.guard';
import { jwtConfig } from 'src/common/configs';
import { KakaoStrategy } from 'src/auth/guard/kakao.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenRepository } from 'src/token/token.repository';
import { AuthException } from './auth.exception';
import { UserRepository } from 'src/user/user.repository';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UserRepository, TokenRepository]),
    JwtModule.register(jwtConfig),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, KakaoStrategy, AuthException],
})
export class AuthModule {}
