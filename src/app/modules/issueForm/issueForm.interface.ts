import { Document, Model, Types } from 'mongoose';
import { IEbl365 } from '../ebl365/ebl365.interface';

export type IIssueForm = Document & {
  ebl365: Types.ObjectId | IEbl365;
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
  issueStatus: string;
  issueSubmittedDate: Date;
  issueResolvedDate?: Date;
  issueSubmittedBy: Types.ObjectId;
  issueResolvedBy?: Types.ObjectId;
};

export type IssueFormModel = Model<IIssueForm, Record<string, unknown>>;
