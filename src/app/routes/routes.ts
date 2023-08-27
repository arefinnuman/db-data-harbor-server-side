import express from 'express';
import { TerminalRoutes } from '../modules/terminal/terminal.routes';

const routes = express.Router();
const moduleRoutes = [
  {
    path: '/terminals',
    route: TerminalRoutes,
  },
];

moduleRoutes.forEach(route => routes.use(route.path, route.route));

export default routes;
