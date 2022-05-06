import express, { Request, Response } from 'express';
import 'dotenv/config';

const app = express();

const configs = [
  process.env.TZ,
  process.env.PORT,
  process.env.DB_DATABASE,
  process.env.KAKAO_SERVER_REDIRECT_URL,
  process.env.KAKAO_CLIENT_REDIRECT_URL,
];

app.get('/', (_: Request, res: Response) =>
  res.send(`This is Express Server Application ${configs.join('\n')}`),
);

app.get('/api/test', (_: Request, res: Response) => {
  res.send([
    {
      id: 1,
      title: 'test1 title',
      content: 'test1 content',
    },
    {
      id: 2,
      title: 'test2 title',
      content: 'test2 content',
    },
    {
      id: 3,
      title: 'test3 title',
      content: 'test3 content',
    },
    {
      id: 4,
      title: 'test4 title',
      content: 'test4 content',
    },
    {
      id: 5,
      title: 'test5 title',
      content: 'test5 content',
    },
  ]);
});

export default app;
