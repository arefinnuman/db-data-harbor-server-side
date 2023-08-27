import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/apiError';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { IConstantFilters } from '../../../interfaces/constantFilters';
import { IGenericResponse } from '../../../interfaces/genericResponse';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { TerminalSearchableFields } from './terminal.constant';
import { ITerminal } from './terminal.interface';
import { Terminal } from './terminal.model';

const createTerminal = async (
  payload: ITerminal,
): Promise<ITerminal | null> => {
  const result = await Terminal.create(payload);
  return result;
};

const getAllTerminal = async (
  filters: Partial<IConstantFilters>,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ITerminal[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions: { [x: string]: unknown }[] = [];

  if (searchTerm) {
    andConditions.push({
      $or: TerminalSearchableFields.map((field: string) => ({
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

  const result = await Terminal.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Terminal.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleTerminal = async (id: string): Promise<ITerminal | null> => {
  const ifExist = await Terminal.findOne({ _id: id });
  if (!ifExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `Terminal not found`);
  }

  const result = await Terminal.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, `Terminal not found`);
  }

  return result;
};

const updateTerminal = async (
  id: string,
  payload: Partial<ITerminal>,
): Promise<ITerminal | null> => {
  const isExist = await Terminal.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `Terminal not found`);
  }

  const result = await Terminal.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteTerminal = async (id: string): Promise<ITerminal | null> => {
  const isExist = await Terminal.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `Terminal not found`);
  }

  const result = await Terminal.findOneAndDelete({ _id: id }, { new: true });
  return result;
};

export const TerminalService = {
  createTerminal,
  getAllTerminal,
  getSingleTerminal,
  updateTerminal,
  deleteTerminal,
};
