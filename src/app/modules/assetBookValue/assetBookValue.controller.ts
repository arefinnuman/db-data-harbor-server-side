import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';
import pick from '../../../interfaces/pick';
import { IUser } from '../user/user.interface';
import { AssetBookValueFilterableFields } from './assetBookValue.constant';
import { IAssetBookValue } from './assetBookValue.interface';
import { AssetBookValueService } from './assetBookValue.service';

const createAssetBookValue = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const user = req.user;

  const result = await AssetBookValueService.createAssetBookValue(
    data,
    user as IUser,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AssetBookValue Created Successfully',
    data: result,
  });
});

const getAllAssetBookValue = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AssetBookValueFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AssetBookValueService.getAllAssetBookValue(
    filters,
    paginationOptions,
  );

  sendResponse<IAssetBookValue[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `AssetBookValue Data Fetched Successfully`,
    meta: result.meta,
    data: result.data,
  });
});

const getSingleAssetBookValue = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AssetBookValueService.getSingleAssetBookValue(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `AssetBookValue data fetched successfully`,
      data: result,
    });
  },
);

const updateAssetBookValue = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await AssetBookValueService.updateAssetBookValue(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `AssetBookValue updated successfully`,
    data: result,
  });
});

const deleteAssetBookValue = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AssetBookValueService.deleteAssetBookValue(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `AssetBookValue deleted successfully`,
    data: result || null,
  });
});

const getAssetValueByTerminalId = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AssetBookValueService.getAssetValueByTerminalId(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `AssetBookValue data fetched successfully`,
      data: result,
    });
  },
);

const unAssignedTerminalsInAssetBookValue = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await AssetBookValueService.unAssignedTerminalsInAssetBookValue();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `AssetBookValue data fetched successfully`,
      data: result,
    });
  },
);

export const AssetBookValueController = {
  createAssetBookValue,
  getAllAssetBookValue,
  getSingleAssetBookValue,
  updateAssetBookValue,
  deleteAssetBookValue,
  getAssetValueByTerminalId,
  unAssignedTerminalsInAssetBookValue,
};
