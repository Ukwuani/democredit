"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
// errors caught in api transactions pushed here
const errorHandler = (err, req, res, next) => {
    res.status(err.status || 500).json(err);
};
app.use(errorHandler);
server.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});
exports.default = server;
