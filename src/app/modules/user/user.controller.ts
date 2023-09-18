import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import { employeeFilterableFields } from '../../../constants/employee.constant';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';

import pick from '../../../interfaces/pick';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...userData } = req.body;
    const result = await UserService.createUser(userData);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully!',
      data: result,
    });
  },
);

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, employeeFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await UserService.getAllUser(filters, paginationOptions);

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully !',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await UserService.getSingleUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully !',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await UserService.updateUser(id, updatedData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.deleteUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully !',
    data: result,
  });
});

const updateToSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const employeeId = req.params.employeeId;
  const result = await UserService.updateToSuperAdmin(employeeId);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: result,
  });
});

const updateToAdmin = catchAsync(async (req: Request, res: Response) => {
  const employeeId = req.params.employeeId;
  const result = await UserService.updateToAdmin(employeeId);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: result,
  });
});

const updateToMaker = catchAsync(async (req: Request, res: Response) => {
  const employeeId = req.params.employeeId;
  const result = await UserService.updateToMaker(employeeId);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: result,
  });
});

const updateToViewer = catchAsync(async (req: Request, res: Response) => {
  const employeeId = req.params.employeeId;
  const result = await UserService.updateToViewer(employeeId);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: result,
  });
});

const approveAnUser = catchAsync(async (req: Request, res: Response) => {
  const employeeId = req.params.employeeId;
  const result = await UserService.approveAnUser(employeeId);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: result,
  });
});

const rejectAnUser = catchAsync(async (req: Request, res: Response) => {
  const employeeId = req.params.employeeId;
  const result = await UserService.rejectAnUser(employeeId);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully !',
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  updateToSuperAdmin,
  updateToAdmin,
  updateToMaker,
  updateToViewer,
  approveAnUser,
  rejectAnUser,
};
