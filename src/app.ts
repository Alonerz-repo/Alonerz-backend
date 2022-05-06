import express from 'express';
import { AppController } from './controllers';
import { AppMiddleware } from './middlewares';
import { AppSwagger } from './utils/swagger';

const app = express();

AppMiddleware(app);
AppSwagger(app);
AppController(app);

export default app;
