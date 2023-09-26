"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueForm = void 0;
const mongoose_1 = require("mongoose");
const IssueFormSchema = new mongoose_1.Schema({
    boothManagement: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'BoothManagement',
        required: true,
    },
    acProblem: {
        type: String,
    },
    lightProblem: {
        type: String,
    },
    machineProblem: {
        type: String,
    },
    mineralBoardProblem: {
        type: String,
    },
    roofCeilingProblem: {
        type: String,
    },
    wallProblem: {
        type: String,
    },
    aicoProblem: {
        type: String,
    },
    tilesProblem: {
        type: String,
    },
    wastageBinProblem: {
        type: String,
    },
    dvrProblem: {
        type: String,
    },
    upsProblem: {
        type: String,
    },
    othersProblem: {
        type: String,
    },
    issueStatus: {
        type: String,
        enum: ['pending', 'working', 'resolved'],
        default: 'pending',
    },
    issueSubmittedDate: {
        type: Date,
        default: Date.now,
    },
    issueResolvedDate: {
        type: Date,
    },
    issueSubmittedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    issueResolvedBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
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
exports.IssueForm = (0, mongoose_1.model)('IssueForm', IssueFormSchema);
