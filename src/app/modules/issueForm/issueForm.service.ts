import httpStatus from 'http-status';
import mongoose, { SortOrder } from 'mongoose';
import ApiError from '../../../errors/apiError';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { IConstantFilters } from '../../../interfaces/constantFilters';
import { IGenericResponse } from '../../../interfaces/genericResponse';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { BoothManagement } from '../boothManagement/boothManagement.model';
import { IssueFormSearchableFields } from './issueForm.constant';
import { IIssueForm } from './issueForm.interface';
import { IssueForm } from './issueForm.model';

const createIssueForm = async (
  payload: IIssueForm,
): Promise<IIssueForm | null> => {
  const isExist = await BoothManagement.findById(payload.boothManagement);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `Ebl365 not found`);
  }

  const session = await mongoose.startSession();
  let newIssueForm: IIssueForm | null;

  try {
    session.startTransaction();

    const createdIssueForm = await IssueForm.create([payload], { session });
    newIssueForm = createdIssueForm[0];

    await BoothManagement.updateOne(
      { _id: payload.boothManagement },
      {
        $push: {
          issues: newIssueForm._id,
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
  const populatedIssueForm = await newIssueForm.populate({
    path: 'boothManagement',
    populate: {
      path: 'issues',
      model: 'IssueForm',
    },
  });

  return populatedIssueForm;
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
    .populate({
      path: 'boothManagement',
      populate: {
        path: 'issues',
        model: 'IssueForm',
      },
    })
    .populate({
      path: 'boothManagement',
      populate: {
        path: 'ebl365',
        model: 'Ebl365',
      },
    })
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

  const result = await IssueForm.findById(id)
    .populate({
      path: 'boothManagement',
      populate: {
        path: 'issues',
        model: 'IssueForm',
      },
    })
    .populate({
      path: 'boothManagement',
      populate: {
        path: 'ebl365',
        model: 'Ebl365',
      },
    });

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
  })
    .populate({
      path: 'boothManagement',
      populate: {
        path: 'issues',
        model: 'IssueForm',
      },
    })
    .populate({
      path: 'boothManagement',
      populate: {
        path: 'ebl365',
        model: 'Ebl365',
      },
    });

  return result;
};

const deleteIssueForm = async (id: string): Promise<IIssueForm | null> => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const issueFormToDelete: IIssueForm | null = await IssueForm.findOne({
      _id: id,
    }).session(session);

    if (!issueFormToDelete) {
      throw new ApiError(httpStatus.NOT_FOUND, `IssueForm not found`);
    }

    const result = await IssueForm.findByIdAndDelete(id).session(session);

    await BoothManagement.updateOne(
      { issues: id },
      {
        $pull: {
          issues: id,
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
  )
    .populate({
      path: 'boothManagement',
      populate: {
        path: 'issues',
        model: 'IssueForm',
      },
    })
    .populate({
      path: 'boothManagement',
      populate: {
        path: 'ebl365',
        model: 'Ebl365',
      },
    });
  return result;
};

const updateToPending = async (id: string): Promise<IIssueForm | null> => {
  const isExist = await IssueForm.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `IssueForm not found`);
  }

  const result = await IssueForm.findOneAndUpdate(
    { _id: id },
    {
      issueStatus: 'pending',
    },
    {
      new: true,
    },
  )
    .populate({
      path: 'boothManagement',
      populate: {
        path: 'issues',
        model: 'IssueForm',
      },
    })
    .populate({
      path: 'boothManagement',
      populate: {
        path: 'ebl365',
        model: 'Ebl365',
      },
    });
  return result;
};

const getPendingIssues = async (): Promise<IIssueForm[] | null> => {
  const result = await IssueForm.find({ issueStatus: 'pending' })
    .populate({
      path: 'boothManagement',
      populate: {
        path: 'issues',
        model: 'IssueForm',
      },
    })
    .populate({
      path: 'boothManagement',
      populate: {
        path: 'ebl365',
        model: 'Ebl365',
      },
    });
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
  })
    .populate({
      path: 'boothManagement',
      populate: {
        path: 'issues',
        model: 'IssueForm',
      },
    })
    .populate({
      path: 'boothManagement',
      populate: {
        path: 'ebl365',
        model: 'Ebl365',
      },
    });

  return result;
};

const getResolvedIssues = async (): Promise<IIssueForm[] | null> => {
  const result = await IssueForm.find({ issueStatus: 'resolved' })
    .populate({
      path: 'boothManagement',
      populate: {
        path: 'issues',
        model: 'IssueForm',
      },
    })
    .populate({
      path: 'boothManagement',
      populate: {
        path: 'ebl365',
        model: 'Ebl365',
      },
    });
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
  })
    .populate({
      path: 'boothManagement',
      populate: {
        path: 'issues',
        model: 'IssueForm',
      },
    })
    .populate({
      path: 'boothManagement',
      populate: {
        path: 'ebl365',
        model: 'Ebl365',
      },
    });
  return result;
};

export const IssueFormService = {
  createIssueForm,
  getAllIssueForm,
  getSingleIssueForm,
  updateIssueForm,
  deleteIssueForm,
  updateToResolve,
  updateToPending,
  getPendingIssues,
  getResolvedIssues,
  getPendingIssuesByEbl365,
  getResolvedIssuesByEbl365,
};
