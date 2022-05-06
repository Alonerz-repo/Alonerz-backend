import express, { Request, Response } from 'express';

const app = express();

app.get('/', (_: Request, res: Response) =>
  res.send('This is Express Server Application'),
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