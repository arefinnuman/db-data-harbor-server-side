// Its boothAcquisition.routes.ts file:

import express from 'express';
import { upload } from '../../../config/multer';
import { BoothAcquisitionController } from './boothAcquisition.controller';

const router = express.Router();

router.post(
  '/',
  upload.fields([
    { name: 'boardMemo', maxCount: 1 },
    { name: 'agreementBetweenEblAndBoothOwner', maxCount: 1 },
  ]),
  BoothAcquisitionController.createBoothAcquisition,
);

export const BoothAcquisitionRoutes = router;
