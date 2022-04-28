import { path } from 'app-root-path';

const envFiles = () =>
  process.env.NODE_ENV === 'production'
    ? [`${path}/env/.production.env`]
    : [`${path}/env/.development.env`];

export const EnvConfig = {
  envFilePath: envFiles(),
  isGlobal: true,
  load: [],
};
