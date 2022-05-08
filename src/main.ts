import 'dotenv/config';
import { AppDataSource } from './data-source';
import { AppModule } from './app.module';

// TypeORM 연결 후 서버 실행
// DB 없이 테스트하기 위해 분리시켰음
AppDataSource.initialize()
  .then(() => {
    const app = AppModule();
    const port = process.env.PORT;
    const listenText = `server running on port ${port}`;
    const listenLog = () => console.log(listenText);
    app.listen(port, listenLog);
  })
  .catch((error) => {
    console.log(error);
  });
