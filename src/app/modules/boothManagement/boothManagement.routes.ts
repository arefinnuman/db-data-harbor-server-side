import express from 'express';
import Authorization from '../../middleWares/authorization';
import { ENUM_USER_ROLE } from '../user/user.constant';
import { BoothManagementController } from './boothManagement.controller';

const router = express.Router();

router.post(
  '/',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
  ),
  BoothManagementController.createBoothManagement,
);

router.get(
  '/',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
    ENUM_USER_ROLE.VIEWER,
  ),
  BoothManagementController.getAllBoothManagement,
);

router.patch(
  '/:id',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BoothManagementController.updateBoothManagement,
);

router.delete(
  '/:id',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BoothManagementController.deleteBoothManagement,
);

router.get(
  '/:id',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
    ENUM_USER_ROLE.VIEWER,
  ),
  BoothManagementController.getSingleBoothManagement,
);

export const BoothManagementRoutes = router;
