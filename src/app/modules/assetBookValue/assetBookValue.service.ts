import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/apiError';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { IConstantFilters } from '../../../interfaces/constantFilters';
import { IGenericResponse } from '../../../interfaces/genericResponse';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { ITerminal } from '../terminal/terminal.interface';
import { IUser } from '../user/user.interface';
import { Terminal } from './../terminal/terminal.model';
import { AssetBookValueSearchableFields } from './assetBookValue.constant';
import { IAssetBookValue } from './assetBookValue.interface';
import { AssetBookValue } from './assetBookValue.model';

const createAssetBookValue = async (
  payload: IAssetBookValue,
  user: IUser,
): Promise<IAssetBookValue | null> => {
  const isExist = await Terminal.findOne({ _id: payload.terminal });
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Terminal is not exist`);
  }

  const terminalIfExist = await AssetBookValue.findOne({
    terminal: payload.terminal,
  });
  if (terminalIfExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `AssetBookValue already exist for this terminal`,
    );
  }

  payload.createdBy = user?.userId;

  const result = await (
    await AssetBookValue.create(payload)
  ).populate('terminal');
  return result;
};

const getAllAssetBookValue = async (
  filters: Partial<IConstantFilters>,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAssetBookValue[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions: { [x: string]: unknown }[] = [];

  if (searchTerm) {
    andConditions.push({
      $or: AssetBookValueSearchableFields.map((field: string) => ({
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

  const result = await AssetBookValue.find(whereConditions)
    .populate('terminal')
    .populate('createdBy')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AssetBookValue.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAssetBookValue = async (
  id: string,
): Promise<IAssetBookValue | null> => {
  const ifExist = await AssetBookValue.findOne({ _id: id });
  if (!ifExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `AssetBookValue not found`);
  }

  const result = await AssetBookValue.findById(id)
    .populate('terminal')
    .populate('createdBy');
  return result;
};

const updateAssetBookValue = async (
  id: string,
  payload: Partial<IAssetBookValue>,
): Promise<IAssetBookValue | null> => {
  const isExist = await AssetBookValue.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `AssetBookValue not found`);
  }

  const result = await AssetBookValue.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('terminal');

  return result;
};

const deleteAssetBookValue = async (
  id: string,
): Promise<IAssetBookValue | null> => {
  const isExist = await AssetBookValue.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `AssetBookValue not found`);
  }

  const result = await AssetBookValue.findOneAndDelete(
    { _id: id },
    { new: true },
  );
  return result;
};

const getAssetValueByTerminalId = async (
  id: string,
): Promise<IAssetBookValue | null> => {
  const result = await AssetBookValue.findOne({ terminal: id })
    .populate('terminal')
    .populate('createdBy');
  return result;
};

const unAssignedTerminalsInAssetBookValue = async (): Promise<ITerminal[]> => {
  const allTerminals = await Terminal.find({});
  const allTerminalIds = allTerminals.map(terminal => terminal._id);

  const assignedTerminals = await AssetBookValue.find({
    terminal: { $in: allTerminalIds },
  });

  const assignedTerminalIds = assignedTerminals.map(
    assetBookValue => assetBookValue.terminal,
  );

  const unassignedTerminalIds = allTerminalIds.filter(
    id => !assignedTerminalIds.some(assignedId => assignedId.equals(id)),
  );

  const resultIds = unassignedTerminalIds.map(id => new Terminal({ _id: id }));

  const unassignedTerminals = await Terminal.find({
    _id: { $in: resultIds },
  });

  return unassignedTerminals;
};

export const AssetBookValueService = {
  createAssetBookValue,
  getAllAssetBookValue,
  getSingleAssetBookValue,
  getAssetValueByTerminalId,
  updateAssetBookValue,
  deleteAssetBookValue,
  unAssignedTerminalsInAssetBookValue,
};
