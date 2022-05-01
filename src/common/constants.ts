import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

interface ServerContants {
  port: number;
}

interface JwtConstants {
  secret: string;
  expiresIn: number;
}

interface BcryptConstants {
  rounds: number;
}

interface KakaoConstants {
  clientID: string;
  callbackURL: string;
}

export const serverConstants: ServerContants = config.get('server');
export const jwtConstants: JwtConstants = config.get('jwt');
export const bcryptConstants: BcryptConstants = config.get('bcrypt');
export const kakaoConstants: KakaoConstants = config.get('kakao');
export const typeOrmConstants: TypeOrmModuleOptions = {
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  ...config.get('typeorm'),
};
