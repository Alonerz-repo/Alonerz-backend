import { DatabaseType } from 'typeorm';

export interface AppConfig {
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
  typeorm: {
    type: DatabaseType;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
  };
}
