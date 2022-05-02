import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { UserModule } from '../user/user.module';
import { jwtConstants } from 'src/common/constants';
import { AuthException } from './auth.exception';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { KakaoStrategy } from './strategies/kakao.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
    TypeOrmModule.forFeature([UserRepository]),
    UserModule,
  ],
  providers: [
    AuthService,
    AuthException,
    LocalStrategy,
    JwtStrategy,
    KakaoStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
