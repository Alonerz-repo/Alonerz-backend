import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { Application } from 'express';

const swaggerYamlPath = path.join(__dirname, '../../swagger.yaml');
const swaggerYaml = YAML.load(swaggerYamlPath);

export const AppSwagger = (app: Application) => {
  app.use('/apis', swaggerUi.serve, swaggerUi.setup(swaggerYaml));
};
