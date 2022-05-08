import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/guard/jwt.guard';
import { jwtConfig } from 'src/common/configs';
import { AuthController } from 'src/controller/auth.controller';
import { AuthService } from 'src/service/auth.service';
import { AuthException } from 'src/exception/auth.exception';
import { UserService } from 'src/service/user.service';

@Module({
  imports: [ConfigModule, JwtModule.register(jwtConfig), UserService],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, AuthException],
})
export class AuthModule {}
