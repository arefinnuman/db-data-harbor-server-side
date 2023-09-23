import { Schema, model } from 'mongoose';
import {
  BoothManagementModel,
  IBoothManagement,
} from './boothManagement.interface';

const BoothManagementSchema = new Schema(
  {
    ebl365: {
      type: Schema.Types.ObjectId,
      ref: 'Ebl365',
      required: true,
    },
    numberOfMachine: {
      type: String,
    },
    numberOfAc: {
      type: String,
    },
    numberOfLight: {
      type: String,
    },
    numberOfMineralBoard: {
      type: String,
    },
    numberOfUps: {
      type: String,
    },
    issues: [
      {
        type: Schema.Types.ObjectId,
        ref: 'IssueForm',
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    approved: {
      type: Boolean,
      default: false,
    },
    approvedBy: {
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
export const BoothManagement = model<IBoothManagement, BoothManagementModel>(
  'BoothManagement',
  BoothManagementSchema,
);
