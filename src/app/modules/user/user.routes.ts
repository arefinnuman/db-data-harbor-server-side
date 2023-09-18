import express from 'express';
import validateRequest from '../../middleWares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser,
);

router.patch(
  '/:employeeId/update-to-super-admin',
  UserController.updateToSuperAdmin,
);

router.patch('/:employeeId/update-to-admin', UserController.updateToAdmin);

router.patch('/:employeeId/update-to-maker', UserController.updateToMaker);

router.patch('/:employeeId/update-to-viewer', UserController.updateToViewer);

router.patch('/:employeeId/approve-user', UserController.approveAnUser);

router.patch('/:employeeId/reject-user', UserController.rejectAnUser);

router.get('/', UserController.getAllUser);

router.get('/:id', UserController.getSingleUser);

router.patch(
  '/:employeeId',
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser,
);

router.delete('/:employeeId', UserController.deleteUser);

export const UserRoutes = router;
