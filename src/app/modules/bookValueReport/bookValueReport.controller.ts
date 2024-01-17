import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';
import pick from '../../../interfaces/pick';
import { IUser } from '../user/user.interface';
import { BookValueReportFilterableFields } from './bookValueReport.constant';
import { IBookValueReport } from './bookValueReport.interface';
import { BookValueReportService } from './bookValueReport.service';

const createBookValueReport = catchAsync(
  async (req: Request, res: Response) => {
    const { ...data } = req.body;
    const user = req.user;

    const result = await BookValueReportService.createBookValueReport(
      data,
      user as IUser,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'BookValueReport Created Successfully',
      data: result,
    });
  },
);

const createAllBookValueReports = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const data = req.body;

    const result = await BookValueReportService.createAllBookValueReports(
      data,
      user as IUser,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'BookValueReport Created Successfully',
      data: result,
    });
  },
);

const createSelectedBookValueReports = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user;
    const { selectedAssetBookValueIds } = req.body;
    const { reportingDate } = req.body;

    if (!Array.isArray(selectedAssetBookValueIds)) {
      return res.status(httpStatus.BAD_REQUEST).send({
        success: false,
        message: 'selectedIds must be an array of AssetBookValue IDs',
      });
    }

    const result = await BookValueReportService.createSelectedBookValueReports(
      user as IUser,
      selectedAssetBookValueIds,
      reportingDate,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'BookValueReport Created Successfully',
      data: result,
    });
  },
);

const getAllBookValueReport = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, BookValueReportFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await BookValueReportService.getAllBookValueReport(
      filters,
      paginationOptions,
    );

    sendResponse<IBookValueReport[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `BookValueReport Data Fetched Successfully`,
      meta: result.meta,
      data: result.data,
    });
  },
);

const getSingleBookValueReport = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BookValueReportService.getSingleBookValueReport(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `BookValueReport data fetched successfully`,
      data: result,
    });
  },
);

const updateBookValueReport = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;

    const result = await BookValueReportService.updateBookValueReport(id, data);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `BookValueReport updated successfully`,
      data: result,
    });
  },
);

const deleteBookValueReport = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await BookValueReportService.deleteBookValueReport(id);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `BookValueReport deleted successfully`,
      data: result || null,
    });
  },
);

const getUniqueReportingTimeBookValueReports = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await BookValueReportService.getUniqueReportingTimeBookValueReports();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `BookValueReport data fetched successfully`,
      data: result,
    });
  },
);

export const BookValueReportController = {
  createBookValueReport,
  createAllBookValueReports,
  createSelectedBookValueReports,
  getAllBookValueReport,
  getSingleBookValueReport,
  updateBookValueReport,
  deleteBookValueReport,
  getUniqueReportingTimeBookValueReports,
};
