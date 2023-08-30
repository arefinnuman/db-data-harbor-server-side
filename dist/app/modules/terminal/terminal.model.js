"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Terminal = void 0;
const mongoose_1 = require("mongoose");
const terminal_constant_1 = require("./terminal.constant");
const TerminalSchema = new mongoose_1.Schema({
    terminalType: {
        type: String,
        enum: terminal_constant_1.TerminalTypeList,
        required: true,
    },
    terminalId: {
        type: String,
        unique: true,
        required: true,
    },
    terminalNameAndId: {
        type: String,
        unique: true,
        required: true,
    },
    terminalStatus: {
        type: String,
        enum: terminal_constant_1.TerminalStatusList,
        required: true,
    },
    terminalBrand: {
        type: String,
        enum: terminal_constant_1.TerminalBrandNameList,
        required: true,
    },
    terminalModel: {
        type: String,
        required: true,
    },
    glNumber: {
        type: String,
        required: true,
    },
    glCode: {
        type: String,
        required: true,
    },
    numberOfBpm: {
        type: Number,
        required: true,
    },
    insuranceLimit: {
        type: String,
        required: true,
    },
    assetTagSerial: {
        type: String,
        required: true,
    },
    deploymentDate: {
        type: Date,
        required: true,
    },
    liveDate: {
        type: Date,
        required: true,
    },
    monthlyNoOfTransaction: {
        type: Number,
        required: true,
    },
    monthlyVolOfTransaction: {
        type: Number,
        required: true,
    },
    monthlyAvgNoOfTxn: {
        type: Number,
        required: true,
    },
    monthlyAvgVolOfTxn: {
        type: Number,
        required: true,
    },
    custodiansKey: {
        name: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
    },
    custodiansCom: {
        name: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
        },
    },
    createdUser: {
        type: String,
    },
    terminal365: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Ebl365',
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Terminal = (0, mongoose_1.model)('Terminal', TerminalSchema);
