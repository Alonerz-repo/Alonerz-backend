import 'dotenv/config';
import * as express from 'express';
import { AppDataSource } from './data-source';
import { routes } from './routes';
import { swagger } from './utils/swagger';

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(swagger.route, swagger.serve, swagger.setup);
    app.use(routes);

    const port = process.env.PORT;
    app.listen(port);

    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(User, {
    //     firstName: 'Timber',
    //     lastName: 'Saw',
    //     age: 27,
    //   })
    // );

    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(User, {
    //     firstName: 'Phantom',
    //     lastName: 'Assassin',
    //     age: 24,
    //   })
    // );
  })
  .catch((error) => console.log(error));
