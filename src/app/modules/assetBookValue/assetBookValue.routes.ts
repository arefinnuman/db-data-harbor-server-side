import express from 'express';
import Authorization from '../../middleWares/authorization';
import { ENUM_USER_ROLE } from '../user/user.constant';
import { AssetBookValueController } from './assetBookValue.controller';

const router = express.Router();

router.get(
  '/terminal/:id',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
    ENUM_USER_ROLE.VIEWER,
  ),
  AssetBookValueController.getAssetValueByTerminalId,
);

router.get(
  '/unassigned-terminals',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AssetBookValueController.unAssignedTerminalsInAssetBookValue,
);

router.post(
  '/',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
  ),
  AssetBookValueController.createAssetBookValue,
);

router.get(
  '/',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
    ENUM_USER_ROLE.VIEWER,
  ),
  AssetBookValueController.getAllAssetBookValue,
);

router.patch(
  '/:id',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AssetBookValueController.updateAssetBookValue,
);

router.delete(
  '/:id',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AssetBookValueController.deleteAssetBookValue,
);

router.get(
  '/:id',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
    ENUM_USER_ROLE.VIEWER,
  ),
  AssetBookValueController.getSingleAssetBookValue,
);

export const AssetBookValueRoutes = router;
