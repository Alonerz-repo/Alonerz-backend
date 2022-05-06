import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
import * as path from 'path';

const swaggerYamlPath = path.join(__dirname, '../../swagger.yaml');
const swaggerYaml = YAML.load(swaggerYamlPath);

export const swagger = {
  route: '/apis',
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerYaml),
};
