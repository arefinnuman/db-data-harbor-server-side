import express from 'express';
import Authorization from '../../middleWares/authorization';
import validateRequest from '../../middleWares/validateRequest';
import { ENUM_USER_ROLE } from './user.constant';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser,
);

router.patch(
  '/:employeeId/update-to-super-admin',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.updateToSuperAdmin,
);

router.patch(
  '/:employeeId/update-to-admin',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.updateToAdmin,
);

router.patch(
  '/:employeeId/update-to-maker',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.updateToMaker,
);

router.patch(
  '/:employeeId/update-to-viewer',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.updateToViewer,
);

router.patch(
  '/:employeeId/approve-user',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.approveAnUser,
);

router.patch(
  '/:employeeId/reject-user',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.rejectAnUser,
);

router.get(
  '/',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.getAllUser,
);

router.get(
  '/:id',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.getSingleUser,
);

router.patch(
  '/:employeeId',
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser,
);

router.delete('/:employeeId', UserController.deleteUser);

export const UserRoutes = router;
