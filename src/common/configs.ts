import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { get } from 'config';

interface Configs {
  server: {
    port: number;
  };
  jwt: {
    secret: string;
    expiresIn: number;
  };
  bcrypt: {
    rounds: number;
  };
  kakao: {
    adminKey: string;
    restAPIKey: string;
    redirectURL: string;
  };
  typeorm: TypeOrmModuleOptions;
}

export const configs: Configs = {
  server: get('server'),
  jwt: get('jwt'),
  bcrypt: get('bcrypt'),
  kakao: get('kakao'),
  typeorm: {
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    ...get('typeorm'),
  },
};
