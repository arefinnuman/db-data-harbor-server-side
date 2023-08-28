/* eslint-disable no-unused-vars */
export enum AreaType {
  Rural = 'Rural',
  Urban = 'Urban',
}

export const AreaTypeList = ['Rural', 'Urban'];

export const Ebl365FilterableFields = [
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

export const Ebl365SearchableFields = [
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
