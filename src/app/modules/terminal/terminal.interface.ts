import { Document, Model, Types } from 'mongoose';
import { IEbl365 } from '../ebl365/ebl365.interface';
import {
  TerminalBrandName,
  TerminalStatus,
  TerminalType,
} from './terminal.constant';

export type ITerminal = Document & {
  terminalType: TerminalType;
  terminalId: string;
  terminalNameAndId: string;
  terminalStatus: TerminalStatus;
  terminalBrand: TerminalBrandName;
  terminalModel: string;
  glNumber: string;
  glCode: string;
  numberOfBpm: number;
  insuranceLimit: string;
  assetTagSerial: string;
  deploymentDate: Date;
  liveDate: Date;
  monthlyNoOfTransaction: number;
  monthlyVolOfTransaction: number;
  monthlyAvgNoOfTxn: number;
  monthlyAvgVolOfTxn: number;
  custodiansKey: {
    name: string;
    contactNumber: string;
  };
  custodiansCom: {
    name: string;
    contactNumber: string;
  };
  createdUser?: string;
  terminal365?: Types.ObjectId | IEbl365;
};

export type TerminalModel = Model<ITerminal, Record<string, unknown>>;
