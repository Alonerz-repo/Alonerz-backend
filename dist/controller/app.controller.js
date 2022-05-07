"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
var AppController = /** @class */ (function () {
    function AppController() {
    }
    AppController.prototype.swagger = function (_, res) {
        return res.redirect('/apis');
    };
    return AppController;
}());
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map