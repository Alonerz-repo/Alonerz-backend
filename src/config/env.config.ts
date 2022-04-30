import { path } from 'app-root-path';
import kakaoConfig from './kakao.config';

const envFiles = () =>
  process.env.NODE_ENV === 'production'
    ? [`${path}/env/.production.env`]
    : [`${path}/env/.development.env`];

export const EnvConfig = {
  envFilePath: envFiles(),
  isGlobal: true,
  load: [kakaoConfig],
};
