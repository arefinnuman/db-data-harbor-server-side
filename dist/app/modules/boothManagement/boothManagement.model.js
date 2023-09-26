"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoothManagement = void 0;
const mongoose_1 = require("mongoose");
const BoothManagementSchema = new mongoose_1.Schema({
    ebl365: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Ebl365',
        required: true,
    },
    numberOfMachine: {
        type: String,
    },
    numberOfAc: {
        type: String,
    },
    numberOfLight: {
        type: String,
    },
    numberOfMineralBoard: {
        type: String,
    },
    numberOfUps: {
        type: String,
    },
    issues: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'IssueForm',
        },
    ],
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
exports.BoothManagement = (0, mongoose_1.model)('BoothManagement', BoothManagementSchema);
