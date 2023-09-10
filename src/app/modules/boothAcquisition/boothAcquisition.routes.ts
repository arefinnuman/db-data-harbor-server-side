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

router.get('/', BoothAcquisitionController.getAllBoothAcquisition);

router.delete('/:id', BoothAcquisitionController.deleteBoothAcquisition);

router.patch('/:id', BoothAcquisitionController.updateBoothAcquisition);

router.get('/:id', BoothAcquisitionController.getSingleBoothAcquisition);

export const BoothAcquisitionRoutes = router;
