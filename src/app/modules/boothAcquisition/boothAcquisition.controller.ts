import { IUser } from './../user/user.interface';
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';
import { IBoothAcquisition } from './boothAcquisition.interface';
import { BoothAcquisitionService } from './boothAcquisition.service';

const createBoothAcquisition = catchAsync(
  async (req: Request, res: Response) => {
    const boardMemoFile = (<any>req.files)[
      'boardMemo'
    ] as Express.Multer.File[];
    const agreementFile = (<any>req.files)[
      'agreementBetweenEblAndBoothOwner'
    ] as Express.Multer.File[];

    if (!boardMemoFile || !agreementFile) {
      throw new Error('Files are missing');
    }

    const user = req.user as IUser;

    const payload: IBoothAcquisition = {
      ...req.body,
      boardMemo: boardMemoFile[0].path,
      agreementBetweenEblAndBoothOwner: agreementFile[0].path,
    };

    const result = await BoothAcquisitionService.createBoothAcquisition(
      payload,
      user,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'BoothAcquisition Created Successfully',
      data: result,
    });
  },
);

const getAllBoothAcquisition = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BoothAcquisitionService.getAllBoothAcquisition();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'BoothAcquisition Data Fetched Successfully',
      data: result,
    });
  },
);

const getSingleBoothAcquisition = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BoothAcquisitionService.getSingleBoothAcquisition(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `BoothAcquisition data fetched successfully`,
      data: result,
    });
  },
);

const updateBoothAcquisition = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;

    const result = await BoothAcquisitionService.updateBoothAcquisition(
      id,
      data,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `BoothAcquisition updated successfully`,
      data: result,
    });
  },
);

const deleteBoothAcquisition = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BoothAcquisitionService.deleteBoothAcquisition(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `BoothAcquisition deleted successfully`,
      data: result || null,
    });
  },
);

export const BoothAcquisitionController = {
  createBoothAcquisition,
  getAllBoothAcquisition,
  getSingleBoothAcquisition,
  updateBoothAcquisition,
  deleteBoothAcquisition,
};
