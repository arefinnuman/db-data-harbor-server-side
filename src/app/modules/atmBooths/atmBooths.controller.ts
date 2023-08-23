import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';
import { AtmBoothsService } from './atmBooths.service';

const createAtmBooth = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await AtmBoothsService.createAtmBooth(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Ebl 365 Created Successfully`,
    data: result,
  });
});

export const AtmBoothsController = {
  createAtmBooth,
};
