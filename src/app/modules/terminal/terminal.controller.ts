import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';
import pick from '../../../interfaces/pick';
import { IUser } from '../user/user.interface';
import { TerminalFilterableFields } from './terminal.constant';
import { ITerminal } from './terminal.interface';
import { TerminalService } from './terminal.service';

const createTerminal = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const user = req?.user;


  const result = await TerminalService.createTerminal(data, user as IUser);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Terminal created successfully`,
    data: result,
  });
});

const getAllTerminal = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, TerminalFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await TerminalService.getAllTerminal(
    filters,
    paginationOptions,
  );

  sendResponse<ITerminal[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Terminal Data Fetched Successfully`,
    meta: result.meta,
    data: result.data,
  });
});

const getSingleTerminal = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await TerminalService.getSingleTerminal(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Terminal data fetched successfully`,
    data: result,
  });
});

const updateTerminal = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const result = await TerminalService.updateTerminal(id, data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Terminal updated successfully`,
    data: result,
  });
});

const deleteTerminal = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await TerminalService.deleteTerminal(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Terminal deleted successfully`,
    data: result || null,
  });
});

export const TerminalController = {
  createTerminal,
  getAllTerminal,
  getSingleTerminal,
  updateTerminal,
  deleteTerminal,
};
