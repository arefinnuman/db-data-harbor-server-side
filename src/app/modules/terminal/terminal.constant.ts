/* eslint-disable no-unused-vars */

export enum TerminalType {
  ATM = 'Atm',
  CRM = 'Crm',
  RTDM = 'Rtdm',
  DROPBOX = 'Dropbox',
  CDM = 'Cdm',
  CHECKSORTINGMACHINE = 'Check Sorting Machine',
}

export enum TerminalStatus {
  ACTIVE = 'Active',
  OUTOFSERVICE = 'Out of Service',
  INACTIVE = 'Inactive',
}

export enum TerminalBrandName {
  NCR = 'NCR',
  GRG = 'GRG',
  VORTEX = 'Vortex',
  OTHERS = 'Others',
}

export const TerminalTypeList = [
  'Atm',
  'Crm',
  'Rtdm',
  'Dropbox',
  'Cdm',
  'Check Sorting Machine',
];

export const TerminalStatusList = ['Active', 'Out of Service', 'Inactive'];

export const TerminalBrandNameList = ['NCR', 'GRG', 'Vortex', 'Others'];

export const TerminalFilterableFields = [
  'searchTerm',
  'id',
  'terminalType',
  'terminalStatus',
  'terminalBrandName',
  'terminalModel',
  'terminalSerialNumber',
  'terminalAssetTagSerial',
  'terminalAssetTagNumber',
  'terminalDeploymentDate',
  'terminalLiveDate',
  'terminalCustodiansKey',
  'terminalCustodiansCom',
];

export const TerminalSearchableFields = [
  'terminalType',
  'terminalStatus',
  'terminalBrandName',
  'terminalModel',
  'terminalSerialNumber',
  'terminalAssetTagSerial',
  'terminalAssetTagNumber',
  'terminalDeploymentDate',
  'terminalLiveDate',
  'terminalCustodiansKey',
  'terminalCustodiansCom',
];
