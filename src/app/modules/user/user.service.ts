/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import config from '../../../config/config';
import { employeeSearchableFields } from '../../../constants/employee.constant';
import ApiError from '../../../errors/apiError';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/genericResponse';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IUser, IUserFilters } from '../user/user.interface';
import { User } from '../user/user.model';

const createUser = async (userData: IUser): Promise<IUser> => {
  userData.employeeId = 'DH-' + userData.employeeCardNumber;

  if (userData.role === 'super_admin') {
    userData.approved = true;
    if (!userData.password) {
      userData.password = config.default_password.super_admin as string;
    }
  }

  if (userData.role === 'admin') {
    userData.approved = true;
    if (!userData.password) {
      userData.password = config.default_password.admin as string;
    }
  }

  if (userData.role === 'maker') {
    userData.approved = true;
    if (!userData.password) {
      userData.password = config.default_password.maker as string;
    }
  }

  if (userData.role === 'viewer') {
    userData.approved = false;
    if (!userData.password) {
      userData.password = config.default_password.viewer as string;
    }
  }

  const user = await User.create(userData);
  return user;
};

const getAllUser = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: employeeSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleUser = async (employeeId: string): Promise<IUser | null> => {
  const isExist = await User.findOne({ employeeId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found !');
  }

  const result = await User.findOne({ employeeId });
  return result;
};

const updateUser = async (
  employeeId: string,
  payload: Partial<IUser>,
): Promise<IUser | null> => {
  const isExist = await User.findOne({ employeeId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found !');
  }

  const { fullName, ...UserData } = payload;
  const updatedUserData: Partial<IUser> = { ...UserData };

  if (fullName && Object.keys(fullName).length > 0) {
    Object.keys(fullName).forEach(key => {
      const nameKey = `fullName.${key}` as keyof Partial<IUser>;
      (updatedUserData as any)[nameKey] =
        fullName[key as keyof typeof fullName];
    });
  }

  const result = await User.findOneAndUpdate({ employeeId }, updatedUserData, {
    new: true,
  });
  return result;
};

const deleteUser = async (employeeId: string): Promise<IUser | null> => {
  const isExist = await User.findOne({ employeeId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found !');
  }

  const result = await User.findOneAndDelete({ employeeId });
  return result;
};

const updateToSuperAdmin = async (
  employeeId: string,
): Promise<IUser | null> => {
  const isExist = await User.findOne({ employeeId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found !');
  }

  const result = await User.findOneAndUpdate(
    {
      employeeId,
    },
    {
      role: 'super_admin',
    },
    {
      new: true,
    },
  );
  return result;
};

const updateToAdmin = async (employeeId: string): Promise<IUser | null> => {
  const isExist = await User.findOne({ employeeId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found !');
  }

  const result = await User.findOneAndUpdate(
    {
      employeeId,
    },
    {
      role: 'admin',
    },
    {
      new: true,
    },
  );
  return result;
};

const updateToMaker = async (employeeId: string): Promise<IUser | null> => {
  const isExist = await User.findOne({ employeeId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found !');
  }

  const result = await User.findOneAndUpdate(
    {
      employeeId,
    },
    {
      role: 'maker',
    },
    {
      new: true,
    },
  );
  return result;
};

const updateToViewer = async (employeeId: string): Promise<IUser | null> => {
  const isExist = await User.findOne({ employeeId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found !');
  }

  const result = await User.findOneAndUpdate(
    {
      employeeId,
    },
    {
      role: 'viewer',
    },
    {
      new: true,
    },
  );
  return result;
};

const approveAnUser = async (employeeId: string): Promise<IUser | null> => {
  const isExist = await User.findOne({ employeeId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found !');
  }

  const result = await User.findOneAndUpdate(
    {
      employeeId,
    },
    {
      approved: true,
    },
    {
      new: true,
    },
  );
  return result;
};

const rejectAnUser = async (employeeId: string): Promise<IUser | null> => {
  const isExist = await User.findOne({ employeeId });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found !');
  }

  const result = await User.findOneAndUpdate(
    {
      employeeId,
    },
    {
      approved: false,
    },
    {
      new: true,
    },
  );
  return result;
};

export const UserService = {
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
