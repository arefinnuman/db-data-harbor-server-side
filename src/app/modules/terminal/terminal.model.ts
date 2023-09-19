import { Schema, model } from 'mongoose';
import {
  TerminalBrandNameList,
  TerminalStatusList,
  TerminalTypeList,
} from './terminal.constant';
import { ITerminal, TerminalModel } from './terminal.interface';

const TerminalSchema = new Schema(
  {
    terminalType: {
      type: String,
      enum: TerminalTypeList,
      required: true,
    },
    terminalId: {
      type: String,
      unique: true,
      required: true,
    },
    terminalNameAndId: {
      type: String,
      unique: true,
      required: true,
    },
    terminalStatus: {
      type: String,
      enum: TerminalStatusList,
      required: true,
    },
    terminalBrand: {
      type: String,
      enum: TerminalBrandNameList,
      required: true,
    },
    terminalModel: {
      type: String,
      required: true,
    },
    glNumber: {
      type: String,
      required: true,
    },
    glCode: {
      type: String,
      required: true,
    },
    numberOfBpm: {
      type: Number,
      required: true,
    },
    insuranceLimit: {
      type: Number,
      required: true,
    },
    assetTagSerial: {
      type: String,
      required: true,
    },
    deploymentDate: {
      type: Date,
      required: true,
    },
    liveDate: {
      type: Date,
      required: true,
    },
    monthlyNoOfTransaction: {
      type: Number,
      required: true,
    },
    monthlyVolOfTransaction: {
      type: Number,
      required: true,
    },
    monthlyAvgNoOfTxn: {
      type: Number,
      required: true,
    },
    monthlyAvgVolOfTxn: {
      type: Number,
      required: true,
    },
    custodiansKey: {
      name: {
        type: String,
        required: true,
      },
      contactNumber: {
        type: String,
        required: true,
      },
    },
    custodiansCom: {
      name: {
        type: String,
        required: true,
      },
      contactNumber: {
        type: String,
        required: true,
      },
    },
    createdUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    ebl365: {
      type: Schema.Types.ObjectId,
      ref: 'Ebl365',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const Terminal = model<ITerminal, TerminalModel>(
  'Terminal',
  TerminalSchema,
);
