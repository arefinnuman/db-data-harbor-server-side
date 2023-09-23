import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';
import pick from '../../../interfaces/pick';
import { IUser } from '../user/user.interface';
import { IssueFormFilterableFields } from './issueForm.constant';
import { IIssueForm } from './issueForm.interface';
import { IssueFormService } from './issueForm.service';

const createIssueForm = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const user = req.user;
  const result = await IssueFormService.createIssueForm(data, user as IUser);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'IssueForm Created Successfully',
    data: result,
  });
});

const getAllIssueForm = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, IssueFormFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await IssueFormService.getAllIssueForm(
    filters,
    paginationOptions,
  );

  sendResponse<IIssueForm[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `IssueForm Data Fetched Successfully`,
    meta: result.meta,
    data: result.data,
  });
});

const getSingleIssueForm = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await IssueFormService.getSingleIssueForm(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `IssueForm data fetched successfully`,
    data: result,
  });
});

const updateIssueForm = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await IssueFormService.updateIssueForm(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `IssueForm updated successfully`,
    data: result,
  });
});

const deleteIssueForm = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await IssueFormService.deleteIssueForm(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `IssueForm deleted successfully`,
    data: result || null,
  });
});

const updateToResolve = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await IssueFormService.updateToResolve(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `IssueForm updated successfully`,
    data: result,
  });
});

const updateToPending = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await IssueFormService.updateToPending(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `IssueForm updated successfully`,
    data: result,
  });
});

const getPendingIssues = catchAsync(async (req: Request, res: Response) => {
  const result = await IssueFormService.getPendingIssues();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `IssueForm data fetched successfully`,
    data: result,
  });
});

const getPendingIssuesByEbl365 = catchAsync(
  async (req: Request, res: Response) => {
    const ebl365 = req.params.id;
    const result = await IssueFormService.getPendingIssuesByEbl365(ebl365);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `IssueForm data fetched successfully`,
      data: result,
    });
  },
);

const getResolvedIssues = catchAsync(async (req: Request, res: Response) => {
  const result = await IssueFormService.getResolvedIssues();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `IssueForm data fetched successfully`,
    data: result,
  });
});

const getResolvedIssuesByEbl365 = catchAsync(
  async (req: Request, res: Response) => {
    const ebl365 = req.params.id;
    const result = await IssueFormService.getResolvedIssuesByEbl365(ebl365);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `IssueForm data fetched successfully`,
      data: result,
    });
  },
);

export const IssueFormController = {
  createIssueForm,
  getAllIssueForm,
  getSingleIssueForm,
  updateIssueForm,
  deleteIssueForm,
  updateToResolve,
  updateToPending,
  getPendingIssues,
  getResolvedIssues,
  getPendingIssuesByEbl365,
  getResolvedIssuesByEbl365,
};
