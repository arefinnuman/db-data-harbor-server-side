import { Document, Model, Types } from 'mongoose';
import { ITerminal } from '../terminal/terminal.interface';
import { IUser } from '../user/user.interface';

export type IAssetBookValue = Document & {
  terminal: Types.ObjectId | ITerminal;

  purchaseMood: string;
  procurementYear: number;
  dateOfPurchase: Date;
  purchasePrice: number;
  firstDeploymentDate: Date;
  machineAge: number;
  assetAmcAmount: number;

  createdBy?: Types.ObjectId | IUser;
  approved?: boolean;
  approvedBy?: Types.ObjectId | IUser;
};

export type AssetBookValueModel = Model<
  IAssetBookValue,
  Record<string, unknown>
>;
