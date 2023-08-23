import express from 'express';
import { AtmBoothsRoutes } from '../modules/atmBooths/atmBooths.routes';

const routes = express.Router();
const moduleRoutes = [
  {
    path: '/atm-booths',
    route: AtmBoothsRoutes,
  },
];

moduleRoutes.forEach(route => routes.use(route.path, route.route));

export default routes;
