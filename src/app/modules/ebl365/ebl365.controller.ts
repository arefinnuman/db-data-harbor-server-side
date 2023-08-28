import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';
import pick from '../../../interfaces/pick';
import { Ebl365FilterableFields } from './ebl365.constant';
import { IEbl365 } from './ebl365.interface';
import { Ebl365Service } from './ebl365.service';

const createEbl365 = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await Ebl365Service.createEbl365(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ebl365 Created Successfully',
    data: result,
  });
});

const getAllEbl365 = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, Ebl365FilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await Ebl365Service.getAllEbl365(filters, paginationOptions);

  sendResponse<IEbl365[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Ebl365 Data Fetched Successfully`,
    meta: result.meta,
    data: result.data,
  });
});

const getSingleEbl365 = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await Ebl365Service.getSingleEbl365(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Ebl365 data fetched successfully`,
    data: result,
  });
});

const updateEbl365 = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await Ebl365Service.updateEbl365(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Ebl365 updated successfully`,
    data: result,
  });
});

const deleteEbl365 = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await Ebl365Service.deleteEbl365(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Ebl365 deleted successfully`,
    data: result || null,
  });
});

export const Ebl365Controller = {
  createEbl365,
  getAllEbl365,
  getSingleEbl365,
  updateEbl365,
  deleteEbl365,
};
