import { Schema, model } from 'mongoose';
import {
  AssetBookValueModel,
  IAssetBookValue,
} from './assetBookValue.interface';

const AssetBookValueSchema = new Schema(
  {
    terminal: {
      type: Schema.Types.ObjectId,
      ref: 'Terminal',
      required: true,
    },

    purchaseMood: {
      type: String,
      required: true,
    },
    procurementYear: {
      type: Number,
      required: true,
    },
    dateOfPurchase: {
      type: Date,
      required: true,
    },
    purchasePrice: {
      type: Number,
      required: true,
    },
    firstDeploymentDate: {
      type: Date,
      required: true,
    },
    machineAge: {
      type: Number,
      required: true,
    },
    assetAmcAmount: {
      type: Number,
      required: true,
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
export const AssetBookValue = model<IAssetBookValue, AssetBookValueModel>(
  'AssetBookValue',
  AssetBookValueSchema,
);
