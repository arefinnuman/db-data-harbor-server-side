import { Document, Model, Types } from 'mongoose';
import { IAssetBookValue } from '../assetBookValue/assetBookValue.interface';
import { IUser } from '../user/user.interface';

export type IBookValueReport = Document & {
  assetBookValue: Types.ObjectId | IAssetBookValue;

  reportingDate: Date;
  machineAgeInDays?: number;
  assetExpiryDate?: Date;
  amcInDays?: number;
  runningMachineRealAge?: number;
  runningAgeConsiderForAmc?: number;
  totalRemainingForAmc?: number;
  ageRunning?: string;
  ageRemaining?: string;
  perDayAssetDepreciation?: number;
  assetDeprecationAmount?: number;
  remainingBookValue?: number;
  depCount?: number;
  machineCost?: number;
  acDepreciation?: number;
  amcForYear?: number;
  amcPerDay?: number;
  machineAgeTillToday?: number;
  dayForAmcPayment?: number;
  amcGiven?: number;
  amcRemaining?: number;
  assetAmcRemaining?: number;
  totalCostOwnerShip?: number;

  createdBy?: Types.ObjectId | IUser;
  approved?: boolean;
  approvedBy?: Types.ObjectId | IUser;
};

export type BookValueReportModel = Model<
  IBookValueReport,
  Record<string, unknown>
>;
