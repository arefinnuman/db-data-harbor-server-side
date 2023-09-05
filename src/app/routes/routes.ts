import express from 'express';
import { BoothManagementRoutes } from '../modules/boothManagement/boothManagement.routes';
import { Ebl365Routes } from '../modules/ebl365/ebl365.routes';
import { IssueFormRoutes } from '../modules/issueForm/issueForm.routes';
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
  {
    path: '/issue-form',
    route: IssueFormRoutes,
  },
  {
    path: '/booth-management',
    route: BoothManagementRoutes,
  },
];

moduleRoutes.forEach(route => routes.use(route.path, route.route));

export default routes;
