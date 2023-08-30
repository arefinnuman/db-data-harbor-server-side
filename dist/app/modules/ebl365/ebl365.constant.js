"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ebl365SearchableFields = exports.Ebl365FilterableFields = exports.AreaTypeList = exports.AreaType = void 0;
/* eslint-disable no-unused-vars */
var AreaType;
(function (AreaType) {
    AreaType["Rural"] = "Rural";
    AreaType["Urban"] = "Urban";
})(AreaType || (exports.AreaType = AreaType = {}));
exports.AreaTypeList = ['Rural', 'Urban'];
exports.Ebl365FilterableFields = [
    'searchTerm',
    'id',
    'ebl365Name',
    'ebl365Address',
    'ebl365Zone',
    'ebl365NameInBengali',
    'ebl365StatusType',
    'locationType',
    'areaType',
    'areaName',
    'division',
    'postalCOde',
    'nearestFamousPlace',
    'noOfAvailableMachine',
    'noOfRunningMachine',
    'divisionId',
    'districtId',
    'upazilaOrThana',
    'controlledBy',
];
exports.Ebl365SearchableFields = [
    'ebl365Name',
    'ebl365Address',
    'ebl365Zone',
    'ebl365NameInBengali',
    'ebl365StatusType',
    'locationType',
    'areaType',
    'areaName',
    'division',
    'postalCOde',
    'nearestFamousPlace',
    'noOfAvailableMachine',
    'noOfRunningMachine',
    'divisionId',
    'districtId',
    'upazilaOrThana',
    'controlledBy',
];
