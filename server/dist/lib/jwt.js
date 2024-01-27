"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwtToken = exports.createJwtToken = void 0;
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
function createJwtToken(user) {
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email,
    };
    const token = JWT.sign(payload, secret, {
        expiresIn: "48h",
    });
    return token;
}
exports.createJwtToken = createJwtToken;
function verifyJwtToken(token) {
    const verifyed = JWT.verify(token, secret);
    return verifyed;
}
exports.verifyJwtToken = verifyJwtToken;
