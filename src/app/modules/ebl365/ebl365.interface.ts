/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Types } from 'mongoose';
import { ITerminal } from '../terminal/terminal.interface';

export type IEbl365 = {
  machines: Types.ObjectId[] | ITerminal[];
  ebl365Name: string;
  ebl365Address: string;
  ebl365Zone: string;
  ebl365NameInBengali: string;
  ebl365StatusType: string;
  locationType: string;
  areaType: string;
  areaName: string;
  geoLatitude: number;
  geoLongitude: number;
  branchControllingGl: string;
  division: string;
  postalCOde: string;
  nearestFamousPlace: string;
  noOfAvailableMachine: number;
  noOfRunningMachine: number;
  divisionId: string;
  districtId: string;
  upazilaOrThana: string;
  controlledBy: string;
  boothDevices: string;
};

export type Ebl365Model = Model<IEbl365, Record<string, unknown>>;
