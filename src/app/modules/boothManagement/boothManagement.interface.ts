import { Document, Model, Types } from 'mongoose';
import { IEbl365 } from '../ebl365/ebl365.interface';
import { IIssueForm } from '../issueForm/issueForm.interface';

export type IBoothManagement = Document & {
  ebl365: Types.ObjectId | IEbl365;
  numberOfMachine?: number;
  numberOfAc?: string;
  numberOfLight?: string;
  numberOfMineralBoard?: string;
  numberOfUps?: string;
  issues?: Types.ObjectId[] | IIssueForm[];
};

export type BoothManagementModel = Model<
  IBoothManagement,
  Record<string, unknown>
>;
