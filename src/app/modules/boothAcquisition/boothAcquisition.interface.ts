/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, Model, Types } from 'mongoose';
import { IEbl365 } from '../ebl365/ebl365.interface';
import { IUser } from '../user/user.interface';

export type IBoothAcquisition = Document & {
  ebl365: Types.ObjectId | IEbl365;
  boardMemo: string;
  agreementBetweenEblAndBoothOwner: string;
  landOwnerName?: string;
  landOwnerAddress?: string;
  landOwnerPhone?: string;
  landOwnerEmail?: string;
  boothMonthlyRent?: number;
  boothLocation?: string;
  boothSize?: string;
  boothType?: string;
  boothContractYear?: string;
  boothExpiryDate?: Date;
  createdBy?: Types.ObjectId | IUser;
  approved?: boolean;
  approvedBy?: Types.ObjectId | IUser;
};

export type BoothAcquisitionModel = Model<
  IBoothAcquisition,
  Record<string, unknown>
>;
