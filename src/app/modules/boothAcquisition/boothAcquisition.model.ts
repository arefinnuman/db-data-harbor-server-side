import { Schema, model } from 'mongoose';
import {
  BoothAcquisitionModel,
  IBoothAcquisition,
} from './boothAcquisition.interface';

const BoothAcquisitionSchema = new Schema(
  {
    ebl365: {
      type: Schema.Types.ObjectId,
      ref: 'Ebl365',
      required: true,
    },
    boardMemo: {
      type: String,
      required: true,
    },
    agreementBetweenEblAndBoothOwner: {
      type: String,
      required: true,
    },
    landOwnerInformation: {
      name: {
        type: String,
      },
      mobile: {
        type: String,
      },
      address: {
        type: String,
      },
      accountNo: {
        type: String,
      },
    },
    boothLocation: {
      type: String,
    },
    boothType: {
      type: String,
    },

    boothStartDate: {
      type: Date,
      required: true,
    },
    boothExpiryDate: {
      type: Date,
      required: true,
    },
    boothContractYear: {
      type: Number,
    },
    boothContractMonth: {
      type: Number,
    },

    boothMonthlyRent: {
      type: Number,
      required: true,
    },
    boothSize: {
      type: Number,
      required: true,
    },
    boothPerSqftRent: {
      type: Number,
    },
    totalBoothRent: {
      type: Number,
    },
    advancePaymentPercentage: {
      type: Number,
      required: true,
    },
    totalAdvancePayment: {
      type: Number,
    },
    monthlyAdvancePayment: {
      type: Number,
    },
    monthlyRentAfterAdvancePayment: {
      type: Number,
    },
    monthlyRentAfterThreeYears: {
      type: Number,
    },
    monthlyRentAfterFiveYears: {
      type: Number,
    },

    currentMonthlyRent: {
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
export const BoothAcquisition = model<IBoothAcquisition, BoothAcquisitionModel>(
  'BoothAcquisition',
  BoothAcquisitionSchema,
);
