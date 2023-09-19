import express from 'express';
import Authorization from '../../middleWares/authorization';
import validateRequest from '../../middleWares/validateRequest';
import { ENUM_USER_ROLE } from '../user/user.constant';
import { TerminalController } from './terminal.controller';
import { TerminalValidation } from './terminal.validation';

const router = express.Router();

router.post(
  '/',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
  ),
  validateRequest(TerminalValidation.createTerminalZodSchema),
  TerminalController.createTerminal,
);

router.get(
  '/',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
    ENUM_USER_ROLE.VIEWER,
  ),
  TerminalController.getAllTerminal,
);

router.patch(
  '/:id',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(TerminalValidation.updateTerminalZodSchema),
  TerminalController.updateTerminal,
);

router.delete(
  '/:id',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  TerminalController.deleteTerminal,
);

router.get(
  '/:id',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
    ENUM_USER_ROLE.VIEWER,
  ),
  TerminalController.getSingleTerminal,
);

export const TerminalRoutes = router;
