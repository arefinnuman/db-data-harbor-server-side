"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const assetBookValue_routes_1 = require("../modules/assetBookValue/assetBookValue.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const bookValueReport_routes_1 = require("../modules/bookValueReport/bookValueReport.routes");
const boothAcquisition_routes_1 = require("../modules/boothAcquisition/boothAcquisition.routes");
const boothManagement_routes_1 = require("../modules/boothManagement/boothManagement.routes");
const ebl365_routes_1 = require("../modules/ebl365/ebl365.routes");
const issueForm_routes_1 = require("../modules/issueForm/issueForm.routes");
const terminal_routes_1 = require("../modules/terminal/terminal.routes");
const user_routes_1 = require("../modules/user/user.routes");
const routes = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/terminals',
        route: terminal_routes_1.TerminalRoutes,
    },
    {
        path: '/ebl-365',
        route: ebl365_routes_1.Ebl365Routes,
    },
    {
        path: '/issue-form',
        route: issueForm_routes_1.IssueFormRoutes,
    },
    {
        path: '/booth-management',
        route: boothManagement_routes_1.BoothManagementRoutes,
    },
    {
        path: '/booth-acquisition',
        route: boothAcquisition_routes_1.BoothAcquisitionRoutes,
    },
    {
        path: '/asset-book-value',
        route: assetBookValue_routes_1.AssetBookValueRoutes,
    },
    {
        path: '/book-value-report',
        route: bookValueReport_routes_1.BookValueReportRoutes,
    },
];
moduleRoutes.forEach(route => routes.use(route.path, route.route));
exports.default = routes;
