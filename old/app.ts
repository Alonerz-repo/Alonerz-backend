import express from 'express';
import { AppMiddleware } from './middleware';
import { AppSwagger } from './utils/swagger';

const app = express();

AppMiddleware(app);
AppSwagger(app);

export default app;
