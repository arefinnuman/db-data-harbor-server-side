import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/apiError';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { IConstantFilters } from '../../../interfaces/constantFilters';
import { IGenericResponse } from '../../../interfaces/genericResponse';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { Ebl365 } from '../ebl365/ebl365.model';
import { IssueFormSearchableFields } from './issueForm.constant';
import { IIssueForm } from './issueForm.interface';
import { IssueForm } from './issueForm.model';

const createIssueForm = async (
  payload: IIssueForm,
): Promise<IIssueForm | null> => {
  const isExist = await Ebl365.findById(payload.ebl365);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `Ebl365 not found`);
  }
  const result = await IssueForm.create(payload);
  const populateResult = result.populate('ebl365');
  return populateResult;
};

const getAllIssueForm = async (
  filters: Partial<IConstantFilters>,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IIssueForm[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions: { [x: string]: unknown }[] = [];

  if (searchTerm) {
    andConditions.push({
      $or: IssueFormSearchableFields.map((field: string) => ({
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

  const result = await IssueForm.find(whereConditions)
    .populate('ebl365')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await IssueForm.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleIssueForm = async (id: string): Promise<IIssueForm | null> => {
  const ifExist = await IssueForm.findOne({ _id: id });
  if (!ifExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `IssueForm not found`);
  }

  const result = await IssueForm.findById(id).populate('ebl365');
  return result;
};

const updateIssueForm = async (
  id: string,
  payload: Partial<IIssueForm>,
): Promise<IIssueForm | null> => {
  const isExist = await IssueForm.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `IssueForm not found`);
  }

  const result = await IssueForm.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteIssueForm = async (id: string): Promise<IIssueForm | null> => {
  const isExist = await IssueForm.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `IssueForm not found`);
  }

  const result = await IssueForm.findOneAndDelete({ _id: id }, { new: true });
  return result;
};

const updateToResolve = async (id: string): Promise<IIssueForm | null> => {
  const isExist = await IssueForm.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `IssueForm not found`);
  }

  const result = await IssueForm.findOneAndUpdate(
    { _id: id },
    {
      issueStatus: 'resolved',
    },
    {
      new: true,
    },
  );
  return result;
};

const getPendingIssues = async (): Promise<IIssueForm[] | null> => {
  const result = await IssueForm.find({ issueStatus: 'pending' }).populate(
    'ebl365',
  );
  return result;
};

const getPendingIssuesByEbl365 = async (
  ebl365: string,
): Promise<IIssueForm[] | null> => {
  const ifExist = await IssueForm.findOne({ ebl365: ebl365 });
  if (!ifExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `IssueForm not found`);
  }

  const result = await IssueForm.find({
    ebl365: ebl365,
    issueStatus: 'pending',
  }).populate('ebl365');

  return result;
};

const getResolvedIssues = async (): Promise<IIssueForm[] | null> => {
  const result = await IssueForm.find({ issueStatus: 'resolved' }).populate(
    'ebl365',
  );
  return result;
};

const getResolvedIssuesByEbl365 = async (
  ebl365: string,
): Promise<IIssueForm[] | null> => {
  const ifExist = await IssueForm.findOne({ ebl365: ebl365 });
  if (!ifExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `IssueForm not found`);
  }

  const result = await IssueForm.find({
    ebl365: ebl365,
    issueStatus: 'resolved',
  }).populate('ebl365');
  return result;
};

export const IssueFormService = {
  createIssueForm,
  getAllIssueForm,
  getSingleIssueForm,
  updateIssueForm,
  deleteIssueForm,
  updateToResolve,
  getPendingIssues,
  getResolvedIssues,
  getPendingIssuesByEbl365,
  getResolvedIssuesByEbl365,
};
