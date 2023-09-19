import express from 'express';
import Authorization from '../../middleWares/authorization';
import validateRequest from '../../middleWares/validateRequest';
import { ENUM_USER_ROLE } from '../user/user.constant';
import { Ebl365Controller } from './ebl365.controller';
import { Ebl365Validation } from './ebl365.validation';

const router = express.Router();

router.post(
  '/',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
  ),
  validateRequest(Ebl365Validation.createEbl365ZodSchema),
  Ebl365Controller.createEbl365,
);

router.get(
  '/',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
    ENUM_USER_ROLE.VIEWER,
  ),
  Ebl365Controller.getAllEbl365,
);

router.patch(
  '/:id',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(Ebl365Validation.updateEbl365ZodSchema),
  Ebl365Controller.updateEbl365,
);

router.delete(
  '/:id',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  Ebl365Controller.deleteEbl365,
);

router.get(
  '/:id',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
    ENUM_USER_ROLE.VIEWER,
  ),
  Ebl365Controller.getSingleEbl365,
);

export const Ebl365Routes = router;
