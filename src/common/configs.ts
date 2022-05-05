import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

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
    clientURL: string;
  };
  typeorm: TypeOrmModuleOptions;
}

export const configs: Configs = {
  server: config.get('server'),
  jwt: config.get('jwt'),
  bcrypt: config.get('bcrypt'),
  kakao: config.get('kakao'),
  typeorm: {
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    ...config.get('typeorm'),
  },
};
