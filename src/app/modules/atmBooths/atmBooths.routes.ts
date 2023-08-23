import express from 'express';
import { AtmBoothsController } from './atmBooths.controller';

const router = express.Router();

router.post('/', AtmBoothsController.createAtmBooth);

export const AtmBoothsRoutes = router;
