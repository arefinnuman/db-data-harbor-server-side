import { Document, Model, Types } from 'mongoose';
import { IEbl365 } from '../ebl365/ebl365.interface';
import { IUser } from '../user/user.interface';

export type IIssueForm = Document & {
  boothManagement: Types.ObjectId | IEbl365;
  machineProblem?: string;
  acProblem?: string;
  lightProblem?: string;
  mineralBoardProblem?: string;
  roofCeilingProblem?: string;
  wallProblem?: string;
  aicoProblem?: string;
  tilesProblem?: string;
  wastageBinProblem?: string;
  dvrProblem?: string;
  upsProblem?: string;
  othersProblem?: string;
  issueStatus: 'pending' | 'in progress' | 'resolved';
  issueSubmittedDate: Date;
  issueResolvedDate?: Date;
  issueSubmittedBy: Types.ObjectId;
  issueResolvedBy?: Types.ObjectId;
  createdBy?: Types.ObjectId | IUser;
  approved?: boolean;
  approvedBy?: Types.ObjectId | IUser;
};

export type IssueFormModel = Model<IIssueForm, Record<string, unknown>>;
