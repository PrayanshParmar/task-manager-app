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
exports.logout = exports.register = exports.login = void 0;
const jwt_1 = require("../lib/jwt");
const userSchema_1 = require("../models/userSchema");
const salt_1 = require("../lib/salt");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.sendStatus(400);
        }
        const user = yield (0, userSchema_1.getUserByEmail)(email).select("+authentication.salt +authentication.password");
        if (!user) {
            return res.sendStatus(401);
        }
        else {
            const expectedHash = (0, salt_1.authentication)(String((_a = user === null || user === void 0 ? void 0 : user.authentication) === null || _a === void 0 ? void 0 : _a.salt), password);
            if (((_b = user === null || user === void 0 ? void 0 : user.authentication) === null || _b === void 0 ? void 0 : _b.password) != expectedHash) {
                return res.sendStatus(401);
            }
            const token = (0, jwt_1.createJwtToken)(user);
            return res
                .cookie("jwt-token", token, {
                httpOnly: true,
                secure: true,
            })
                .sendStatus(200);
        }
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.sendStatus(400);
        }
        const existingUser = yield (0, userSchema_1.getUserByEmail)(email);
        if (existingUser) {
            return res.sendStatus(400);
        }
        const salt = (0, salt_1.random)();
        yield (0, userSchema_1.createUser)({
            email,
            username,
            authentication: {
                salt,
                password: (0, salt_1.authentication)(salt, password),
            },
        });
        return res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});
exports.register = register;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("jwt-token");
        return res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.logout = logout;
