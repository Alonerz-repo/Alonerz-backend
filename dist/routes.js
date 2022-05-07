"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var express_1 = require("express");
var app_controller_1 = require("./controller/app.controller");
var Routes = [
    {
        method: 'get',
        route: '/',
        controller: app_controller_1.AppController,
        action: 'swagger',
    },
];
exports.routes = (function () {
    var router = (0, express_1.Router)();
    Routes.forEach(function (route) {
        router[route.method](route.route, function (req, res, next) {
            var result = new route.controller()[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(function (result) {
                    return result !== null && result !== undefined
                        ? res.send(result)
                        : undefined;
                });
            }
            else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });
    return router;
})();
//# sourceMappingURL=routes.js.map