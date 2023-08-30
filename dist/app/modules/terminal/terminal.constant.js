"use strict";
/* eslint-disable no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalSearchableFields = exports.TerminalFilterableFields = exports.TerminalBrandNameList = exports.TerminalStatusList = exports.TerminalTypeList = exports.TerminalBrandName = exports.TerminalStatus = exports.TerminalType = void 0;
var TerminalType;
(function (TerminalType) {
    TerminalType["ATM"] = "Atm";
    TerminalType["CRM"] = "Crm";
    TerminalType["RTDM"] = "Rtdm";
    TerminalType["DROPBOX"] = "Dropbox";
    TerminalType["CDM"] = "Cdm";
    TerminalType["CHECKSORTINGMACHINE"] = "Check Sorting Machine";
})(TerminalType || (exports.TerminalType = TerminalType = {}));
var TerminalStatus;
(function (TerminalStatus) {
    TerminalStatus["ACTIVE"] = "Active";
    TerminalStatus["OUTOFSERVICE"] = "Out of Service";
    TerminalStatus["INACTIVE"] = "Inactive";
})(TerminalStatus || (exports.TerminalStatus = TerminalStatus = {}));
var TerminalBrandName;
(function (TerminalBrandName) {
    TerminalBrandName["NCR"] = "NCR";
    TerminalBrandName["GRG"] = "GRG";
    TerminalBrandName["VORTEX"] = "Vortex";
    TerminalBrandName["OTHERS"] = "Others";
})(TerminalBrandName || (exports.TerminalBrandName = TerminalBrandName = {}));
exports.TerminalTypeList = [
    'Atm',
    'Crm',
    'Rtdm',
    'Dropbox',
    'Cdm',
    'Check Sorting Machine',
];
exports.TerminalStatusList = ['Active', 'Out of Service', 'Inactive'];
exports.TerminalBrandNameList = ['NCR', 'GRG', 'Vortex', 'Others'];
exports.TerminalFilterableFields = [
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
exports.TerminalSearchableFields = [
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
