/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/apiError';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { IConstantFilters } from '../../../interfaces/constantFilters';
import { IGenericResponse } from '../../../interfaces/genericResponse';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { ITerminal } from '../terminal/terminal.interface';
import { Ebl365SearchableFields } from './ebl365.constant';
import { IEbl365 } from './ebl365.interface';
import { Ebl365 } from './ebl365.model';

const createEbl365 = async (payload: IEbl365): Promise<IEbl365 | null> => {
  const result = await (await Ebl365.create(payload)).populate('machines');

  const machineTypeCounts: { [key: string]: number } = {};

  for (const machine of result.machines as ITerminal[]) {
    if (machineTypeCounts[machine.terminalType]) {
      machineTypeCounts[machine.terminalType] += 1;
    } else {
      machineTypeCounts[machine.terminalType] = 1;
    }
  }

  const boothDevicesArray = Object.keys(machineTypeCounts).map(
    type => `${machineTypeCounts[type]} ${type}`,
  );

  let boothDevicesStr = '';
  if (boothDevicesArray.length > 1) {
    boothDevicesStr =
      boothDevicesArray.slice(0, -1).join(', ') +
      ' and ' +
      boothDevicesArray.slice(-1);
  } else {
    boothDevicesStr = boothDevicesArray[0] || '';
  }

  result.boothDevices = boothDevicesStr;

  await Ebl365.findByIdAndUpdate(result._id, { boothDevices: boothDevicesStr });

  return result;
};

const getAllEbl365 = async (
  filters: Partial<IConstantFilters>,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IEbl365[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions: { [x: string]: unknown }[] = [];

  if (searchTerm) {
    andConditions.push({
      $or: Ebl365SearchableFields.map((field: string) => ({
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

  const result = await Ebl365.find(whereConditions)
    .populate('machines')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Ebl365.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleEbl365 = async (id: string): Promise<IEbl365 | null> => {
  const ifExist = await Ebl365.findOne({ _id: id });
  if (!ifExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `Ebl365 not found`);
  }

  const result = await Ebl365.findById(id).populate('machines');
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, `Ebl365 not found`);
  }

  return result;
};

const updateEbl365 = async (
  id: string,
  payload: Partial<IEbl365>,
): Promise<IEbl365 | null> => {
  const isExist = await Ebl365.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `Ebl365 not found`);
  }

  const result = await Ebl365.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('machines');

  return result;
};

const deleteEbl365 = async (id: string): Promise<IEbl365 | null> => {
  const isExist = await Ebl365.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `Ebl365 not found`);
  }

  const result = await Ebl365.findOneAndDelete({ _id: id }, { new: true });
  return result;
};

export const Ebl365Service = {
  createEbl365,
  getAllEbl365,
  getSingleEbl365,
  updateEbl365,
  deleteEbl365,
};
