// Its boothAcquisition.controller.ts file:

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */

import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';
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

    const result = await BoothAcquisitionService.createBoothAcquisition({
      ...req.body,
      boardMemo: boardMemoFile[0].path,
      agreementBetweenEblAndBoothOwner: agreementFile[0].path,
    });

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'BoothAcquisition Created Successfully',
      data: result,
    });
  },
);

export const BoothAcquisitionController = {
  createBoothAcquisition,
};

// const getAllBoothManagement = catchAsync(
//   async (req: Request, res: Response) => {
//     const filters = pick(req.query, BoothManagementFilterableFields);
//     const paginationOptions = pick(req.query, paginationFields);

//     const result = await BoothManagementService.getAllBoothManagement(
//       filters,
//       paginationOptions,
//     );

//     sendResponse<IBoothManagement[]>(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: `BoothManagement Data Fetched Successfully`,
//       meta: result.meta,
//       data: result.data,
//     });
//   },
// );

// const getSingleBoothManagement = catchAsync(
//   async (req: Request, res: Response) => {
//     const id = req.params.id;
//     const result = await BoothManagementService.getSingleBoothManagement(id);

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: `BoothManagement data fetched successfully`,
//       data: result,
//     });
//   },
// );

// const updateBoothManagement = catchAsync(
//   async (req: Request, res: Response) => {
//     const id = req.params.id;
//     const data = req.body;

//     const result = await BoothManagementService.updateBoothManagement(id, data);

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: `BoothManagement updated successfully`,
//       data: result,
//     });
//   },
// );

// const deleteBoothManagement = catchAsync(
//   async (req: Request, res: Response) => {
//     const id = req.params.id;
//     const result = await BoothManagementService.deleteBoothManagement(id);

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: `BoothManagement deleted successfully`,
//       data: result || null,
//     });
//   },
// );
