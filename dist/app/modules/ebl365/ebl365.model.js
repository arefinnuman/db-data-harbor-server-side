"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ebl365 = void 0;
const mongoose_1 = require("mongoose");
const Ebl365Schema = new mongoose_1.Schema({
    machines: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
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
    createdUser: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Ebl365 = (0, mongoose_1.model)('Ebl365', Ebl365Schema);
