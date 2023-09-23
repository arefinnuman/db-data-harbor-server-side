import { Request, Response } from 'express';
import httpStatus from 'http-status';

import config from '../../../config/config';
import catchAsync from '../../../custom/catchAsync';
import sendResponse from '../../../custom/sendResponse';
import { AuthService } from './auth.service';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await AuthService.singUp(userData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: `User created successfully !`,
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User logged in successfully !`,
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User logged in successfully !`,
    data: result,
  });
});

export const AuthController = {
  signUp,
  loginUser,
  refreshToken,
};
