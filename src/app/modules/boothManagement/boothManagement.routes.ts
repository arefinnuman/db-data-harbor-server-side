import express from 'express';
import { BoothManagementController } from './boothManagement.controller';

const router = express.Router();

router.post('/', BoothManagementController.createBoothManagement);

router.get('/', BoothManagementController.getAllBoothManagement);

router.patch('/:id', BoothManagementController.updateBoothManagement);

router.delete('/:id', BoothManagementController.deleteBoothManagement);

router.get('/:id', BoothManagementController.getSingleBoothManagement);

export const BoothManagementRoutes = router;
