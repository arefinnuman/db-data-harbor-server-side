import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { BoothAcquisitionRoutes } from '../modules/boothAcquisition/boothAcquisition.routes';
import { BoothManagementRoutes } from '../modules/boothManagement/boothManagement.routes';
import { Ebl365Routes } from '../modules/ebl365/ebl365.routes';
import { IssueFormRoutes } from '../modules/issueForm/issueForm.routes';
import { TerminalRoutes } from '../modules/terminal/terminal.routes';
import { UserRoutes } from '../modules/user/user.routes';

const routes = express.Router();
const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/terminals',
    route: TerminalRoutes,
  },
  {
    path: '/ebl-365',
    route: Ebl365Routes,
  },
  {
    path: '/issue-form',
    route: IssueFormRoutes,
  },
  {
    path: '/booth-management',
    route: BoothManagementRoutes,
  },
  {
    path: '/booth-acquisition',
    route: BoothAcquisitionRoutes,
  },
];

moduleRoutes.forEach(route => routes.use(route.path, route.route));

export default routes;
