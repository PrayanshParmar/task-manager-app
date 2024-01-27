"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = require("../controllers/authentication");
exports.default = (router) => {
    router.post('/api/v1/register', authentication_1.register);
    router.post('/api/v1/login', authentication_1.login);
    router.get('/api/v1/logout', authentication_1.logout);
};
