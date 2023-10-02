"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetBookValue = void 0;
const mongoose_1 = require("mongoose");
const AssetBookValueSchema = new mongoose_1.Schema({
    terminal: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Terminal',
        required: true,
    },
    purchaseMood: {
        type: String,
        required: true,
    },
    procurementYear: {
        type: Number,
        required: true,
    },
    dateOfPurchase: {
        type: Date,
        required: true,
    },
    purchasePrice: {
        type: Number,
        required: true,
    },
    firstDeploymentDate: {
        type: Date,
        required: true,
    },
    machineAge: {
        type: Number,
        required: true,
    },
    assetAmcAmount: {
        type: Number,
        required: true,
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
exports.AssetBookValue = (0, mongoose_1.model)('AssetBookValue', AssetBookValueSchema);
