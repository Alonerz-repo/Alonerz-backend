"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swagger = void 0;
var swaggerUi = require("swagger-ui-express");
var YAML = require("yamljs");
var path = require("path");
var swaggerYamlPath = path.join(__dirname, '../../swagger.yaml');
var swaggerYaml = YAML.load(swaggerYamlPath);
exports.swagger = {
    route: '/apis',
    serve: swaggerUi.serve,
    setup: swaggerUi.setup(swaggerYaml),
};
//# sourceMappingURL=swagger.js.map