import { Application } from 'express';
import { appConfig } from '../common/config';
import express from 'express';
import cors from 'cors';

export const AppMiddleware = (app: Application) => {
  app.set('config', appConfig);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: ['*'],
      credentials: true,
    })
  );
};
