import 'dotenv/config';
import * as express from 'express';
import { AppDataSource } from './data-source';
import { routes } from './routes';
import { swagger } from './utils/swagger';
import * as cors from 'cors';

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({ origin: '*', credentials: true }));
    app.use(swagger.route, swagger.serve, swagger.setup);
    app.use(routes);

    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`server running on pot ${port}`);
    });
  })
  .catch((error) => console.log(error));
