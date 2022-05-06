import { AppController } from './controller/app.controller';

export const Routes = [
  {
    method: 'get',
    route: '/',
    controller: AppController,
    action: 'swagger',
  },
];
