import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/guard/jwt.guard';
import { jwtConfig } from 'src/common/configs';
import { AuthController } from 'src/controller/auth.controller';
import { AuthService } from 'src/service/auth.service';
import { UserModule } from './user.module';
import { KakaoStrategy } from 'src/guard/kakao.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { UserToken } from 'src/entity/user-token.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, UserToken]),
    JwtModule.register(jwtConfig),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, KakaoStrategy],
})
export class AuthModule {}
