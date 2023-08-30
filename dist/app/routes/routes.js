'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const ebl365_routes_1 = require('../modules/ebl365/ebl365.routes');
const terminal_routes_1 = require('../modules/terminal/terminal.routes');
const routes = express_1.default.Router();
const moduleRoutes = [
  {
    path: '/terminals',
    route: terminal_routes_1.TerminalRoutes,
  },
  {
    path: '/ebl-365',
    route: ebl365_routes_1.Ebl365Routes,
  },
];
moduleRoutes.forEach(route => routes.use(route.path, route.route));
exports.default = routes;
