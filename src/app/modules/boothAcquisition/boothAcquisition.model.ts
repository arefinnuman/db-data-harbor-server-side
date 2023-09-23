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
    boothMonthlyRent: {
      type: Number,
    },
    boothLocation: {
      type: String,
    },
    boothSize: {
      type: String,
    },
    boothType: {
      type: String,
    },
    boothContractYear: {
      type: String,
    },
    boothExpiryDate: {
      type: Date,
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
