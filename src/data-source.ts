import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserBlock } from './entity/user-block.entity';
import { UserCareer } from './entity/user-career.entity';
import { UserFollow } from './entity/user-follow.entity';
import { UserPoint } from './entity/user-point.entity';
import { User } from './entity/user.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT),
  username: String(process.env.DB_USERNAME),
  password: String(process.env.DB_PASSWORD),
  database: String(process.env.DB_DATABASE),
  synchronize: Boolean(process.env.DB_SYNCHRONIZE),
  logging: false,
  entities: [User, UserPoint, UserCareer, UserFollow, UserBlock],
  migrations: [],
  subscribers: [],
});
