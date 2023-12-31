import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config/config';
import ApiError from '../../../errors/apiError';
import { IUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { jwtHelpers } from './../../../helper/jwtHelpers';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const singUp = async (userData: IUser): Promise<IUser> => {
  userData.employeeId = 'DH-' + userData.employeeCardNumber;
  userData.role = 'viewer';
  userData.ownCreated = true;
  userData.approved = false;

  const user = await User.create(userData);
  return user;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;
  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  if (isUserExist.approved === false) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'You are not approved yet, Please wait a admin will approve you soon',
    );
  }

  const {
    id: userId,
    employeeId,
    role,
    team,
    needsPasswordChange,
    approved,
    fullName,
  } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { userId, employeeId, role, needsPasswordChange, approved, team, fullName },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, employeeId, role, needsPasswordChange, approved, team, fullName },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
    approved,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret,
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, `Invalid Refresh Token`);
  }
  const { employeeId } = verifiedToken;

  const isUserExist = await User.isUserExist(employeeId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user does not exist');
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.employeeId,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string,
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  singUp,
  loginUser,
  refreshToken,
};
