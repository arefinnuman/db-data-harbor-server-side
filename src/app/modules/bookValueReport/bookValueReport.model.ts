import { Schema, model } from 'mongoose';
import {
  BookValueReportModel,
  IBookValueReport,
} from './bookValueReport.interface';

const BookValueReportSchema = new Schema(
  {
    assetBookValue: {
      type: Schema.Types.ObjectId,
      ref: 'AssetBookValue',
      required: true,
    },
    
    reportingDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    machineAgeInDays: {
      type: Number,
    },
    assetExpiryDate: {
      type: Date,
    },
    amcInDays: {
      type: Number,
    },
    runningMachineRealAge: {
      type: Number,
    },
    runningAgeConsiderForAmc: {
      type: Number,
    },
    totalRemainingForAmc: {
      type: Number,
    },
    ageRunning: {
      type: String,
    },
    ageRemaining: {
      type: String,
    },
    perDayAssetDepreciation: {
      type: Number,
    },
    assetDeprecationAmount: {
      type: Number,
    },
    remainingBookValue: {
      type: Number,
    },
    depCount: {
      type: Number,
    },
    machineCost: {
      type: Number,
    },
    acDepreciation: {
      type: Number,
    },
    amcForYear: {
      type: Number,
    },
    amcPerDay: {
      type: Number,
    },
    machineAgeTillToday: {
      type: Number,
    },
    dayForAmcPayment: {
      type: Number,
    },
    amcGiven: {
      type: Number,
    },
    amcRemaining: {
      type: Number,
    },
    assetAmcRemaining: {
      type: Number,
    },
    totalCostOwnerShip: {
      type: Number,
    },

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
export const BookValueReport = model<IBookValueReport, BookValueReportModel>(
  'BookValueReport',
  BookValueReportSchema,
);
