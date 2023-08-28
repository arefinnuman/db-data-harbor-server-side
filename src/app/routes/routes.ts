import express from 'express';
import { Ebl365Routes } from '../modules/ebl365/ebl365.routes';
import { TerminalRoutes } from '../modules/terminal/terminal.routes';

const routes = express.Router();
const moduleRoutes = [
  {
    path: '/terminals',
    route: TerminalRoutes,
  },
  {
    path: '/ebl-365',
    route: Ebl365Routes,
  },
];

moduleRoutes.forEach(route => routes.use(route.path, route.route));

export default routes;
