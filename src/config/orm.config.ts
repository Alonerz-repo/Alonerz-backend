import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { writeFileSync } from 'fs';
import { path } from 'app-root-path';

const envPath =
  process.env.NODE_ENV === 'production'
    ? `${path}/env/.production.env`
    : `${path}/env/.development.env`;

dotenv.config({ path: envPath });

export class OrmConfig {
  constructor(
    private readonly env: { [key: string]: string | undefined } = process.env,
  ) {
    const ormConfig = this.genTypeOrmConfig();
    const ormConfigJson = JSON.stringify(ormConfig, null, 2);
    writeFileSync('ormconfig.json', ormConfigJson);
  }

  private envItem(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`ConfigError: missing env.${key}`);
    }
    return value;
  }

  private genTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.envItem('DATABASE_HOST'),
      port: parseInt(this.envItem('DATABASE_PORT')),
      username: this.envItem('DATABASE_USERNAME'),
      password: this.envItem('DATABASE_PASSWORD'),
      database: this.envItem('DATABASE_DBNAME'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      migrationsTableName: 'migrations',
      migrations: ['src/migration/*.ts'],
      synchronize: Boolean(this.envItem('DATABASE_SYNC')),
      cli: {
        migrationsDir: 'src/migration',
      },
    };
  }
}
