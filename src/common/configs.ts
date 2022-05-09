import { JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

export const envConfig = {
  isGlobal: true,
  load: [
    () => ({
      secret: process.env.JWT_SECRET,
      auth: {
        clientUrl: process.env.KAKAO_CLIENT_REDIRECT_URL,
      },
      kakao: {
        clientID: process.env.KAKAO_REST_API_KEY,
        callbackURL: process.env.KAKAO_SERVER_REDIRECT_URL,
        clientSecret: '',
      },
    }),
  ],
};

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_DATABASE),
  synchronize: Boolean(process.env.DB_SYNCHRONIZE),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
};

export const jwtConfig: JwtModuleOptions = {
  secret: String(process.env.JWT_SECRET),
  signOptions: { expiresIn: '15m' },
};
