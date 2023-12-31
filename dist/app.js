"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalError_1 = __importDefault(require("./app/middleWares/globalError"));
const notFound_1 = require("./app/middleWares/notFound");
const routes_1 = __importDefault(require("./app/routes/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('uploads'));
app.get('/', (req, res) => {
    res.send('Welcome to DB Data Harbor');
});
app.use('/api/v1/', routes_1.default);
app.use(globalError_1.default);
app.use(notFound_1.notFoundHandler);
exports.default = app;
