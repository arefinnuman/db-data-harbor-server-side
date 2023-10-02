import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/apiError';
import { PaginationHelpers } from '../../../helper/paginationHelper';
import { IConstantFilters } from '../../../interfaces/constantFilters';
import { IGenericResponse } from '../../../interfaces/genericResponse';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { AssetBookValue } from '../assetBookValue/assetBookValue.model';
import { IUser } from '../user/user.interface';
import {
  BookValueReportSearchableFields,
  daysToYearsMonthsDays,
} from './bookValueReport.constant';
import { IBookValueReport } from './bookValueReport.interface';
import { BookValueReport } from './bookValueReport.model';

const createBookValueReport = async (
  payload: IBookValueReport,
  user: IUser,
): Promise<IBookValueReport | null> => {
  const assetBookValue = await AssetBookValue.findOne({
    _id: payload.assetBookValue,
  });
  if (!assetBookValue) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'AssetBookValue not found');
  }

  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const { machineAge, firstDeploymentDate, purchasePrice, assetAmcAmount } =
    assetBookValue;

  payload.machineAgeInDays = machineAge * 365;

  const firstDepDate = new Date(firstDeploymentDate);
  if (isNaN(firstDepDate.getTime())) {
    throw new Error('Invalid firstDeploymentDate');
  }

  payload.assetExpiryDate = new Date(
    firstDepDate.getTime() + payload.machineAgeInDays * oneDayInMilliseconds,
  );

  payload.amcInDays = payload.machineAgeInDays - 365;

  if (!(payload.reportingDate instanceof Date)) {
    payload.reportingDate = new Date(payload.reportingDate);
  }

  if (isNaN(payload.reportingDate.getTime())) {
    throw new Error('Invalid reportingDate');
  }

  payload.runningMachineRealAge = Math.round(
    (payload.reportingDate.getTime() - firstDepDate.getTime()) /
      oneDayInMilliseconds,
  );

  payload.totalRemainingForAmc =
    payload.amcInDays - payload.runningMachineRealAge;

  payload.ageRunning = daysToYearsMonthsDays(payload.runningMachineRealAge);
  payload.ageRemaining = daysToYearsMonthsDays(payload.totalRemainingForAmc);

  payload.perDayAssetDepreciation = purchasePrice / payload.machineAgeInDays;
  payload.assetDeprecationAmount =
    payload.perDayAssetDepreciation * payload.runningMachineRealAge;
  payload.remainingBookValue =
    payload.perDayAssetDepreciation *
    (payload.machineAgeInDays - payload.runningMachineRealAge);

  payload.depCount = payload.remainingBookValue;
  payload.machineCost = payload.depCount + payload.assetDeprecationAmount;
  payload.amcForYear = machineAge;
  payload.amcPerDay = assetAmcAmount / 365;
  payload.machineAgeTillToday = payload.runningMachineRealAge;
  payload.dayForAmcPayment = payload.machineAgeTillToday - 365;
  payload.amcGiven = payload.dayForAmcPayment * payload.amcPerDay;
  payload.amcRemaining =
    payload.amcPerDay * payload.amcInDays - payload.amcGiven;
  payload.assetAmcRemaining = payload.amcRemaining;
  payload.totalCostOwnerShip = payload.machineCost + payload.assetAmcRemaining;

  if (user?.userId) {
    payload.createdBy = user.userId;
  }

  const result = await (
    await BookValueReport.create(payload)
  ).populate('assetBookValue');
  return result;
};

const createAllBookValueReports = async (
  data: IBookValueReport,
  user: IUser,
): Promise<(IBookValueReport | null)[]> => {
  let date: Date | undefined;
  if (data.reportingDate) {
    date = data.reportingDate;
  } else {
    date = new Date();
  }

  const allAssetBookValues = await AssetBookValue.find();

  const allReports = await Promise.all(
    allAssetBookValues.map(async assetBookValue => {
      const payload: Partial<IBookValueReport> = {
        assetBookValue: assetBookValue._id,
        reportingDate: date,
      };

      return createBookValueReport(payload as IBookValueReport, user);
    }),
  );

  return allReports;
};

const createSelectedBookValueReports = async (
  user: IUser,
  selectedAssetBookValueIds: string[],
  reportingDate: Date | undefined,
): Promise<(IBookValueReport | null)[]> => {
  let date: Date | undefined;
  if (reportingDate) {
    date = reportingDate;
  } else {
    date = new Date();
  }

  const selectedAssetBookValues = await AssetBookValue.find({
    _id: { $in: selectedAssetBookValueIds },
  });

  if (selectedAssetBookValues.length === 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'No asset book values found for the provided IDs.',
    );
  }

  const allReports = await Promise.all(
    selectedAssetBookValues.map(async assetBookValue => {
      const payload: Partial<IBookValueReport> = {
        assetBookValue: assetBookValue._id,
        reportingDate: date,
      };

      return createBookValueReport(payload as IBookValueReport, user);
    }),
  );

  return allReports;
};

const getAllBookValueReport = async (
  filters: Partial<IConstantFilters>,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBookValueReport[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions: { [x: string]: unknown }[] = [];

  if (searchTerm) {
    andConditions.push({
      $or: BookValueReportSearchableFields.map((field: string) => ({
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

  const result = await BookValueReport.find(whereConditions)
    .populate('assetBookValue')
    .populate('createdBy')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await BookValueReport.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBookValueReport = async (
  id: string,
): Promise<IBookValueReport | null> => {
  const ifExist = await BookValueReport.findOne({ _id: id });
  if (!ifExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `BookValueReport not found`);
  }

  const result = await BookValueReport.findById(id)
    .populate('machines')
    .populate('createdBy');
  return result;
};

const updateBookValueReport = async (
  id: string,
  payload: Partial<IBookValueReport>,
): Promise<IBookValueReport | null> => {
  const isExist = await BookValueReport.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `BookValueReport not found`);
  }

  const result = await BookValueReport.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
    .populate('machines')
    .populate('createdUser');

  return result;
};

const deleteBookValueReport = async (
  id: string,
): Promise<IBookValueReport | null> => {
  const isExist = await BookValueReport.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `BookValueReport not found`);
  }

  const result = await BookValueReport.findOneAndDelete(
    { _id: id },
    { new: true },
  );
  return result;
};

const getUniqueReportingTimeBookValueReports = async (): Promise<
  IBookValueReport[]
> => {
  const result = await BookValueReport.aggregate([
    {
      $group: {
        _id: {
          assetBookValue: '$assetBookValue',
          reportingDate: '$reportingDate',
        },
        doc: { $first: '$$ROOT' },
      },
    },
    {
      $replaceRoot: { newRoot: '$doc' },
    },
  ]).exec();

  const populatedResults = await BookValueReport.populate(result, []);

  return populatedResults;
};

export const BookValueReportService = {
  createBookValueReport,
  createAllBookValueReports,
  createSelectedBookValueReports,
  getAllBookValueReport,
  getSingleBookValueReport,
  updateBookValueReport,
  deleteBookValueReport,
  getUniqueReportingTimeBookValueReports,
};
