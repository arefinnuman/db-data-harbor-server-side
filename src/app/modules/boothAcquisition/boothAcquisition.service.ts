import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { Ebl365 } from '../ebl365/ebl365.model';
import { IUser } from '../user/user.interface';
import { cleanData, cleanSingleData } from './boothAcquisition.constant';
import { IBoothAcquisition } from './boothAcquisition.interface';
import { BoothAcquisition } from './boothAcquisition.model';

const createBoothAcquisition = async (
  payload: IBoothAcquisition,
  user: IUser,
): Promise<IBoothAcquisition | null> => {
  const ebl365Exist = await Ebl365.findOne({ _id: payload.ebl365 });
  if (!ebl365Exist) {
    throw new ApiError(httpStatus.NOT_FOUND, `Ebl365 not found`);
  }

  const ifExist = await BoothAcquisition.findOne({ ebl365: payload.ebl365 });
  if (ifExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      `Booth Acquisition already exist with this booth`,
    );
  }

  const startDate = new Date(payload.boothStartDate);
  const expiryDate = new Date(payload.boothExpiryDate);

  const yearsDiff = expiryDate.getFullYear() - startDate.getFullYear();

  payload.boothContractYear = yearsDiff;
  payload.boothContractMonth = yearsDiff * 12;

  payload.boothPerSqftRent = payload.boothMonthlyRent / payload.boothSize;
  payload.totalBoothRent =
    payload.boothMonthlyRent * payload.boothContractMonth;

  payload.totalAdvancePayment =
    (payload.totalBoothRent * payload.advancePaymentPercentage) / 100;

  payload.monthlyAdvancePayment = payload.totalAdvancePayment / 60;

  payload.monthlyRentAfterAdvancePayment =
    payload.boothMonthlyRent - payload.monthlyAdvancePayment;

  payload.monthlyRentAfterThreeYears =
    payload.monthlyRentAfterAdvancePayment +
    (payload.monthlyRentAfterAdvancePayment * 15) / 100;

  payload.monthlyRentAfterFiveYears =
    payload.monthlyRentAfterThreeYears + payload.monthlyAdvancePayment;

  const currentDate = new Date();
  const monthDifference =
    (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
    currentDate.getMonth() -
    startDate.getMonth();

  if (monthDifference <= 36) {
    payload.currentMonthlyRent = payload.monthlyRentAfterAdvancePayment;
  } else if (monthDifference <= 60) {
    payload.currentMonthlyRent = payload.monthlyRentAfterThreeYears;
  } else {
    payload.currentMonthlyRent = payload.monthlyRentAfterFiveYears;
  }

  payload.createdBy = user.userId;

  const result = await BoothAcquisition.create(payload);
  return result;
};

const getAllBoothAcquisition = async (): Promise<IBoothAcquisition[]> => {
  const result = await BoothAcquisition.find()
    .populate('ebl365')
    .populate('createdBy')
    .lean();
  return cleanData(result);
};

const getSingleBoothAcquisition = async (
  id: string,
): Promise<IBoothAcquisition | null> => {
  const ifExist = await BoothAcquisition.findOne({ _id: id });
  if (!ifExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `BoothAcquisition not found`);
  }

  const result = await BoothAcquisition.findById(id)
    .populate('ebl365')
    .populate('createdBy')
    .lean();

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, `BoothAcquisition not found`);
  }

  return cleanSingleData(result);
};

const updateBoothAcquisition = async (
  id: string,
  payload: Partial<IBoothAcquisition>,
): Promise<IBoothAcquisition | null> => {
  const isExist = await BoothAcquisition.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `BoothAcquisition not found`);
  }

  const result = await BoothAcquisition.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('ebl365');

  return result;
};

const deleteBoothAcquisition = async (
  id: string,
): Promise<IBoothAcquisition | null> => {
  const isExist = await BoothAcquisition.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `BoothAcquisition not found`);
  }

  const result = await BoothAcquisition.findOneAndDelete(
    { _id: id },
    { new: true },
  );
  return result;
};

export const BoothAcquisitionService = {
  createBoothAcquisition,
  getAllBoothAcquisition,
  getSingleBoothAcquisition,
  updateBoothAcquisition,
  deleteBoothAcquisition,
};
