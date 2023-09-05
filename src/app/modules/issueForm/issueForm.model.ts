import { Schema, model } from 'mongoose';
import { IIssueForm, IssueFormModel } from './issueForm.interface';

const IssueFormSchema = new Schema(
  {
    ebl365: {
      type: Schema.Types.ObjectId,
      ref: 'Ebl365',
      required: true,
    },
    acProblem: {
      type: String,
    },
    lightProblem: {
      type: String,
    },
    machineProblem: {
      type: String,
    },
    mineralBoardProblem: {
      type: String,
    },
    roofCeilingProblem: {
      type: String,
    },
    wallProblem: {
      type: String,
    },
    aicoProblem: {
      type: String,
    },
    tilesProblem: {
      type: String,
    },
    wastageBinProblem: {
      type: String,
    },
    dvrProblem: {
      type: String,
    },
    upsProblem: {
      type: String,
    },
    othersProblem: {
      type: String,
    },
    issueStatus: {
      type: String,
      enum: ['pending', 'resolved'],
      default: 'pending',
    },
    issueSubmittedDate: {
      type: Date,
      default: Date.now,
    },
    issueResolvedDate: {
      type: Date,
    },
    issueSubmittedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      // required: true,
    },
    issueResolvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const IssueForm = model<IIssueForm, IssueFormModel>(
  'IssueForm',
  IssueFormSchema,
);
