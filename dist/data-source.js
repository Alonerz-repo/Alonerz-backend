"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var user_block_entity_1 = require("./entity/user-block.entity");
var user_career_entity_1 = require("./entity/user-career.entity");
var user_follow_entity_1 = require("./entity/user-follow.entity");
var user_point_entity_1 = require("./entity/user-point.entity");
var user_entity_1 = require("./entity/user.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: String(process.env.DB_HOST),
    port: Number(process.env.DB_PORT),
    username: String(process.env.DB_USERNAME),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_DATABASE),
    synchronize: Boolean(process.env.DB_SYNCHRONIZE),
    logging: false,
    entities: [user_entity_1.User, user_point_entity_1.UserPoint, user_career_entity_1.UserCareer, user_follow_entity_1.UserFollow, user_block_entity_1.UserBlock],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map