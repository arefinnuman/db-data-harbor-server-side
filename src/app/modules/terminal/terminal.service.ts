import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/apiError';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { IConstantFilters } from '../../../interfaces/constantFilters';
import { IGenericResponse } from '../../../interfaces/genericResponse';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IEbl365 } from '../ebl365/ebl365.interface';
import { Ebl365 } from '../ebl365/ebl365.model';
import { IUser } from '../user/user.interface';
import { TerminalSearchableFields } from './terminal.constant';
import { ITerminal } from './terminal.interface';
import { Terminal } from './terminal.model';

const createTerminal = async (
  payload: ITerminal,
  user: IUser,
): Promise<ITerminal | null> => {
  console.log(user);
  const createdUserId = user.userId;

  payload.createdUser = createdUserId;

  let newTerminal: ITerminal | null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const ebl365: IEbl365 | null = await Ebl365.findOne({
      _id: payload.ebl365,
    }).session(session);

    if (!ebl365) {
      throw new ApiError(httpStatus.NOT_FOUND, `Ebl365 not found`);
    }

    const createdTerminal = await Terminal.create([payload], { session });
    newTerminal = createdTerminal[0];

    await Ebl365.updateOne(
      { _id: payload.ebl365 },
      {
        $push: {
          machines: newTerminal._id,
        },
      },
      { session },
    );

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }

  return newTerminal;
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
    .populate('ebl365')
    .populate('createdUser')
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

  const result = await Terminal.findById(id)
    .populate('ebl365')
    .populate('createdUser');
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
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const terminalToDelete: ITerminal | null = await Terminal.findOne({
      _id: id,
    }).session(session);
    if (!terminalToDelete) {
      throw new ApiError(httpStatus.NOT_FOUND, `Terminal not found`);
    }

    const result = await Terminal.findByIdAndDelete(id).session(session);

    await Ebl365.updateOne(
      { machines: id },
      {
        $pull: {
          machines: id,
        },
      },
      { session },
    );

    await session.commitTransaction();
    return result;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export const TerminalService = {
  createTerminal,
  getAllTerminal,
  getSingleTerminal,
  updateTerminal,
  deleteTerminal,
};
