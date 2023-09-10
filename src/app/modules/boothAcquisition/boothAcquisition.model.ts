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
