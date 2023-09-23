import { Schema, model } from 'mongoose';
import { Ebl365Model, IEbl365 } from './ebl365.interface';

const Ebl365Schema = new Schema(
  {
    machines: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Terminal',
      },
    ],
    ebl365Name: {
      type: String,
      required: true,
      unique: true,
    },
    ebl365Address: {
      type: String,
      required: true,
    },
    ebl365Zone: {
      type: String,
      required: true,
    },
    ebl365NameInBengali: {
      type: String,
      required: true,
    },
    ebl365StatusType: {
      type: String,
      required: true,
    },
    locationType: {
      type: String,
      required: true,
    },
    areaType: {
      type: String,
      required: true,
    },
    areaName: {
      type: String,
      required: true,
    },
    geoLatitude: {
      type: Number,
      required: true,
    },
    geoLongitude: {
      type: Number,
      required: true,
    },
    branchControllingGl: {
      type: String,
      required: true,
    },
    division: {
      type: String,
      required: true,
    },
    postalCOde: {
      type: String,
      required: true,
    },
    nearestFamousPlace: {
      type: String,
      required: true,
    },
    noOfAvailableMachine: {
      type: Number,
    },
    noOfRunningMachine: {
      type: Number,
    },
    divisionId: {
      type: String,
      required: true,
    },
    districtId: {
      type: String,
      required: true,
    },
    upazilaOrThana: {
      type: String,
      required: true,
    },
    controlledBy: {
      type: String,
      required: true,
    },
    boothDevices: {
      type: String,
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

export const Ebl365 = model<IEbl365, Ebl365Model>('Ebl365', Ebl365Schema);
