import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/apiError';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { IConstantFilters } from '../../../interfaces/constantFilters';
import { IGenericResponse } from '../../../interfaces/genericResponse';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IEbl365 } from '../ebl365/ebl365.interface';
import { Ebl365 } from '../ebl365/ebl365.model';
import { IUser } from '../user/user.interface';
import { BoothManagementSearchableFields } from './boothManagement.constant';
import { IBoothManagement } from './boothManagement.interface';
import { BoothManagement } from './boothManagement.model';

const createBoothManagement = async (
  payload: IBoothManagement,
  user: IUser,
): Promise<IBoothManagement | null> => {
  const ebl365Exist = await Ebl365.findOne({ _id: payload.ebl365 });
  if (!ebl365Exist) {
    throw new ApiError(httpStatus.NOT_FOUND, `Ebl365 not found`);
  }

  const ifExist = await BoothManagement.findOne({ ebl365: payload.ebl365 });
  if (ifExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `BoothManagement already exist with this booth`,
    );
  }

  const ebl365 = await Ebl365.findOne({ _id: payload.ebl365 });
  payload.numberOfMachine = ebl365?.noOfAvailableMachine;

  payload.createdBy = user?.userId;
  const result = await BoothManagement.create(payload);
  const populateResult = result.populate('ebl365');
  return populateResult;
};

const getAllBoothManagement = async (
  filters: Partial<IConstantFilters>,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBoothManagement[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions: { [x: string]: unknown }[] = [];

  if (searchTerm) {
    andConditions.push({
      $or: BoothManagementSearchableFields.map((field: string) => ({
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

  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0
      ? {
          $and: andConditions,
        }
      : {};

  const result = await BoothManagement.find(whereConditions)
    .populate('ebl365')
    .populate('issues')
    .populate('createdBy')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await BoothManagement.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBoothManagement = async (
  id: string,
): Promise<IBoothManagement | null> => {
  const ifExist = await BoothManagement.findOne({ _id: id });
  if (!ifExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `BoothManagement not found`);
  }

  const result = await BoothManagement.findById(id)
    .populate('ebl365')
    .populate('issues')
    .populate('createdBy');
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, `BoothManagement not found`);
  }

  return result;
};

const getBoothManagementByEbl365 = async (
  ebl365Id: string,
): Promise<IBoothManagement | null> => {
  const ifExist = await BoothManagement.findOne({ ebl365: ebl365Id });
  if (!ifExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `BoothManagement not found`);
  }

  const result = await BoothManagement.findOne({ ebl365: ebl365Id })
    .populate('ebl365')
    .populate('issues')
    .populate('createdBy');
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, `BoothManagement not found`);
  }

  return result;
};

const updateBoothManagement = async (
  id: string,
  payload: Partial<IBoothManagement>,
): Promise<IBoothManagement | null> => {
  const isExist = await BoothManagement.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `BoothManagement not found`);
  }

  const result = await BoothManagement.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('ebl365');

  return result;
};

const deleteBoothManagement = async (
  id: string,
): Promise<IBoothManagement | null> => {
  const isExist = await BoothManagement.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `BoothManagement not found`);
  }

  const result = await BoothManagement.findOneAndDelete(
    { _id: id },
    { new: true },
  );
  return result;
};

const unAssigned365Booths = async (): Promise<IEbl365[]> => {
  const allEbl365 = await Ebl365.find({});

  const allEbl365Ids = allEbl365.map(ebl365 => ebl365._id);

  const assignedEbl365 = await BoothManagement.find({
    ebl365: { $in: allEbl365Ids },
  });
  const assignedEbl365Ids = assignedEbl365.map(
    boothManagement => boothManagement.ebl365,
  );

  const unassignedEbl365Ids = allEbl365Ids.filter(
    id => !assignedEbl365Ids.some(assignedId => assignedId.equals(id)),
  );

  const resultIds = unassignedEbl365Ids.map(id => new Ebl365({ _id: id }));

  const unassignedEbl365 = await Ebl365.find({
    _id: { $in: resultIds },
  });

  return unassignedEbl365;
};

export const BoothManagementService = {
  createBoothManagement,
  getAllBoothManagement,
  getSingleBoothManagement,
  getBoothManagementByEbl365,
  updateBoothManagement,
  deleteBoothManagement,
  unAssigned365Booths,
};
