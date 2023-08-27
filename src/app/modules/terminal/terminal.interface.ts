import { Model } from 'mongoose';
import {
  TerminalBrandName,
  TerminalStatus,
  TerminalType,
} from './terminal.constant';

export type ITerminal = {
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
};

export type TerminalModel = Model<ITerminal, Record<string, unknown>>;
