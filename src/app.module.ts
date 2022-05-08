import * as express from 'express';
import * as cors from 'cors';
import { swagger } from './utils/swagger';
import { AppController } from './controller/app.controller';
import { AuthController } from './controller/auth.controller';
import { UserController } from './controller/user.controller';

// 서버 애플리케이션 구성 설정
const providers = {
  middlewares: [
    express.json(),
    express.urlencoded({ extended: true }),
    cors({ origin: '*', credentials: true }),
  ],
  thirdpartys: [
    (app: express.Application) =>
      app.use(swagger.route, swagger.serve, swagger.setup),
  ],
  controllers: [AppController, AuthController, UserController],
};

// 서버 애플리케이션 모듈화
export const AppModule = (): express.Application => {
  const app = express();

  // 미들웨어 적용
  providers.middlewares.forEach((middleware) => {
    app.use(middleware);
  });

  // third-party 적용
  providers.thirdpartys.forEach((thirdParty) => {
    thirdParty(app);
  });

  // 컨트롤러 적용
  providers.controllers.forEach((Controller) => {
    app.use(new Controller()['router']);
  });

  return app;
};
