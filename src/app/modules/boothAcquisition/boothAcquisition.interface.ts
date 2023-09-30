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
  boothLocation?: string;
  boothType?: string;

  boothStartDate: Date;
  boothExpiryDate: Date;
  boothContractYear: number;
  boothContractMonth: number;

  boothMonthlyRent: number;
  boothSize: number;
  boothPerSqftRent?: number;
  totalBoothRent?: number;
  advancePaymentPercentage: number;
  totalAdvancePayment?: number;
  monthlyAdvancePayment?: number;
  monthlyRentAfterAdvancePayment?: number;
  monthlyRentAfterThreeYears?: number;
  monthlyRentAfterFiveYears?: number;

  currentMonthlyRent?: number;

  createdBy?: Types.ObjectId | IUser;
  approved?: boolean;
  approvedBy?: Types.ObjectId | IUser;
};

export type BoothAcquisitionModel = Model<
  IBoothAcquisition,
  Record<string, unknown>
>;
