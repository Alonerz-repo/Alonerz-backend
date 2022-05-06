import 'dotenv/config';
import { AppConfig } from './interface';

export const appConfig: AppConfig = {
  server: {
    port: Number(process.env.PORT),
  },
  jwt: {
    secret: String(process.env.JWT_SECRET),
    expiresIn: Number(process.env.JWT_EXPIRESIN),
  },
  bcrypt: {
    rounds: Number(process.env.BCRYPT_ROUNDS),
  },
  typeorm: {
    type: 'mysql',
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_DATABASE),
    synchronize: Boolean(process.env.DB_SYNCHRONIZE),
  },
};
