import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';
import pick from '../../../interfaces/pick';
import { IUser } from '../user/user.interface';
import { BoothManagementFilterableFields } from './boothManagement.constant';
import { IBoothManagement } from './boothManagement.interface';
import { BoothManagementService } from './boothManagement.service';

const createBoothManagement = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const user = req.user;

    const result = await BoothManagementService.createBoothManagement(
      data,
      user as IUser,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'BoothManagement Created Successfully',
      data: result,
    });
  },
);

const getAllBoothManagement = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, BoothManagementFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await BoothManagementService.getAllBoothManagement(
      filters,
      paginationOptions,
    );

    sendResponse<IBoothManagement[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `BoothManagement Data Fetched Successfully`,
      meta: result.meta,
      data: result.data,
    });
  },
);

const getSingleBoothManagement = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BoothManagementService.getSingleBoothManagement(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `BoothManagement data fetched successfully`,
      data: result,
    });
  },
);

const getBoothManagementByEbl365 = catchAsync(
  async (req: Request, res: Response) => {
    const ebl365Id = req.params.id;
    const result =
      await BoothManagementService.getBoothManagementByEbl365(ebl365Id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `BoothManagement data fetched successfully`,
      data: result,
    });
  },
);

const updateBoothManagement = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;

    const result = await BoothManagementService.updateBoothManagement(id, data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `BoothManagement updated successfully`,
      data: result,
    });
  },
);

const deleteBoothManagement = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BoothManagementService.deleteBoothManagement(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `BoothManagement deleted successfully`,
      data: result || null,
    });
  },
);

export const BoothManagementController = {
  createBoothManagement,
  getAllBoothManagement,
  getSingleBoothManagement,
  getBoothManagementByEbl365,
  updateBoothManagement,
  deleteBoothManagement,
};
