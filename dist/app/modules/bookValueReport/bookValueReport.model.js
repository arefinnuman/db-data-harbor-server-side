"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookValueReport = void 0;
const mongoose_1 = require("mongoose");
const BookValueReportSchema = new mongoose_1.Schema({
    assetBookValue: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'AssetBookValue',
        required: true,
    },
    reportingDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    machineAgeInDays: {
        type: Number,
    },
    assetExpiryDate: {
        type: Date,
    },
    amcInDays: {
        type: Number,
    },
    runningMachineRealAge: {
        type: Number,
    },
    runningAgeConsiderForAmc: {
        type: Number,
    },
    totalRemainingForAmc: {
        type: Number,
    },
    ageRunning: {
        type: String,
    },
    ageRemaining: {
        type: String,
    },
    perDayAssetDepreciation: {
        type: Number,
    },
    assetDeprecationAmount: {
        type: Number,
    },
    remainingBookValue: {
        type: Number,
    },
    depCount: {
        type: Number,
    },
    machineCost: {
        type: Number,
    },
    acDepreciation: {
        type: Number,
    },
    amcForYear: {
        type: Number,
    },
    amcPerDay: {
        type: Number,
    },
    machineAgeTillToday: {
        type: Number,
    },
    dayForAmcPayment: {
        type: Number,
    },
    amcGiven: {
        type: Number,
    },
    amcRemaining: {
        type: Number,
    },
    assetAmcRemaining: {
        type: Number,
    },
    totalCostOwnerShip: {
        type: Number,
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    approved: {
        type: Boolean,
        default: false,
    },
    approvedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.BookValueReport = (0, mongoose_1.model)('BookValueReport', BookValueReportSchema);
