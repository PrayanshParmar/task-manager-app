"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jwt_1 = require("../lib/jwt");
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwtToken = req.cookies["jwt-token"];
        if (!jwtToken) {
            return res.sendStatus(404);
        }
        const verify = (0, jwt_1.verifyJwtToken)(jwtToken);
        if (!verify) {
            return res.sendStatus(403);
        }
        req.user = verify;
        return next();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.isAuthenticated = isAuthenticated;
