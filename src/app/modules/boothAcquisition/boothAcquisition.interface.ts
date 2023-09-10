// Its boothAcquisition.interface.ts file

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, Model, Types } from 'mongoose';
import { IEbl365 } from '../ebl365/ebl365.interface';

export type IBoothAcquisition = Document & {
  ebl365: Types.ObjectId | IEbl365;
  boardMemo: string;
  agreementBetweenEblAndBoothOwner: string;
  landOwnerInformation?: {
    name?: string;
    mobile?: string;
    address?: string;
    accountNo?: string;
  };
  boothMonthlyRent?: number;
  boothLocation?: string;
  boothSize?: string;
  boothType?: string;
  boothContractYear?: string;
  boothExpiryDate?: Date;
};

export type BoothAcquisitionModel = Model<
  IBoothAcquisition,
  Record<string, unknown>
>;
