"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
require("dotenv/config");
const routes_1 = __importDefault(require("./routes"));
require("./db/db-mongo");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const PORT = process.env.PORT || 7000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/', (0, routes_1.default)());
const server = http_1.default.createServer(app);
server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
