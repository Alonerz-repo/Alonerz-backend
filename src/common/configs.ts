import { JwtModuleOptions } from '@nestjs/jwt';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
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
      kakaoAdmin: process.env.KAKAO_ADMIN_KEY,
    }),
  ],
};

export const s3Config: AWS.ConfigurationOptions = {
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  },
  region: process.env.AWS_S3_REGION,
};

export const s3Buckets = {
  profileImage: process.env.AWS_S3_PROFILE_BUCKET,
  groupImage: process.env.AWS_S3_GROUP_BUCKET,
  assetImage: process.env.AWS_S3_ASSET_BUCKET,
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
  logging: true,
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migration',
  },
};

export const jwtConfig: JwtModuleOptions = {
  secret: String(process.env.JWT_SECRET),
  signOptions: { expiresIn: '1d' },
};

export const bearerConfig: SecuritySchemeObject = {
  type: 'http',
  scheme: 'bearer',
  name: 'JWT',
  in: 'header',
};
