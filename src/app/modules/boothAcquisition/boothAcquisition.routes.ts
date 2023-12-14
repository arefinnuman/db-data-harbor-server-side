import express from 'express';
import { upload } from '../../../config/multer';
import Authorization from '../../middleWares/authorization';
import { ENUM_USER_ROLE } from '../user/user.constant';
import { BoothAcquisitionController } from './boothAcquisition.controller';

const router = express.Router();

router.get('/unassigned', BoothAcquisitionController.unAssigned365Booths);

router.post(
  '/',
  upload.fields([
    { name: 'boardMemo', maxCount: 1 },
    { name: 'agreementBetweenEblAndBoothOwner', maxCount: 1 },
  ]),
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
  ),
  BoothAcquisitionController.createBoothAcquisition,
);

router.get(
  '/',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
    ENUM_USER_ROLE.VIEWER,
  ),
  BoothAcquisitionController.getAllBoothAcquisition,
);

router.delete(
  '/:id',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BoothAcquisitionController.deleteBoothAcquisition,
);

router.patch(
  '/:id',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BoothAcquisitionController.updateBoothAcquisition,
);

router.get(
  '/:id',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
    ENUM_USER_ROLE.VIEWER,
  ),
  BoothAcquisitionController.getSingleBoothAcquisition,
);

export const BoothAcquisitionRoutes = router;
