import httpStatus from 'http-status';
import ApiError from '../../../errors/apiError';
import { IBoothAcquisition } from './boothAcquisition.interface';
import { BoothAcquisition } from './boothAcquisition.model';

const createBoothAcquisition = async (
  payload: IBoothAcquisition,
): Promise<IBoothAcquisition | null> => {
  const result = await BoothAcquisition.create(payload);
  return result;
};

const getAllBoothAcquisition = async (): Promise<IBoothAcquisition[]> => {
  const result = await BoothAcquisition.find().populate('ebl365');
  return result;
};

const getSingleBoothAcquisition = async (
  id: string,
): Promise<IBoothAcquisition | null> => {
  const ifExist = await BoothAcquisition.findOne({ _id: id });
  if (!ifExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `BoothAcquisition not found`);
  }

  const result = await BoothAcquisition.findById(id).populate('ebl365');
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, `BoothAcquisition not found`);
  }

  return result;
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
