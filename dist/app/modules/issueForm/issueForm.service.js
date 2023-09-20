"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssueFormService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const boothManagement_model_1 = require("../boothManagement/boothManagement.model");
const issueForm_constant_1 = require("./issueForm.constant");
const issueForm_model_1 = require("./issueForm.model");
const createIssueForm = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield boothManagement_model_1.BoothManagement.findById(payload.boothManagement);
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `Ebl365 not found`);
    }
    const session = yield mongoose_1.default.startSession();
    let newIssueForm;
    try {
        session.startTransaction();
        const createdIssueForm = yield issueForm_model_1.IssueForm.create([payload], { session });
        newIssueForm = createdIssueForm[0];
        yield boothManagement_model_1.BoothManagement.updateOne({ _id: payload.boothManagement }, {
            $push: {
                issues: newIssueForm._id,
            },
        }, { session });
        yield session.commitTransaction();
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        yield session.endSession();
    }
    const populatedIssueForm = yield newIssueForm.populate({
        path: 'boothManagement',
        populate: {
            path: 'issues',
            model: 'IssueForm',
        },
    });
    return populatedIssueForm;
});
const getAllIssueForm = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: issueForm_constant_1.IssueFormSearchableFields.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.PaginationHelpers.calculatePagination(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0
        ? {
            $and: andConditions,
        }
        : {};
    const result = yield issueForm_model_1.IssueForm.find(whereConditions)
        .populate({
        path: 'boothManagement',
        populate: {
            path: 'issues',
            model: 'IssueForm',
        },
    })
        .populate({
        path: 'boothManagement',
        populate: {
            path: 'ebl365',
            model: 'Ebl365',
        },
    })
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield issueForm_model_1.IssueForm.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleIssueForm = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield issueForm_model_1.IssueForm.findOne({ _id: id });
    if (!ifExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `IssueForm not found`);
    }
    const result = yield issueForm_model_1.IssueForm.findById(id)
        .populate({
        path: 'boothManagement',
        populate: {
            path: 'issues',
            model: 'IssueForm',
        },
    })
        .populate({
        path: 'boothManagement',
        populate: {
            path: 'ebl365',
            model: 'Ebl365',
        },
    });
    return result;
});
const updateIssueForm = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield issueForm_model_1.IssueForm.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `IssueForm not found`);
    }
    const result = yield issueForm_model_1.IssueForm.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    })
        .populate({
        path: 'boothManagement',
        populate: {
            path: 'issues',
            model: 'IssueForm',
        },
    })
        .populate({
        path: 'boothManagement',
        populate: {
            path: 'ebl365',
            model: 'Ebl365',
        },
    });
    return result;
});
const deleteIssueForm = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const issueFormToDelete = yield issueForm_model_1.IssueForm.findOne({
            _id: id,
        }).session(session);
        if (!issueFormToDelete) {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, `IssueForm not found`);
        }
        const result = yield issueForm_model_1.IssueForm.findByIdAndDelete(id).session(session);
        yield boothManagement_model_1.BoothManagement.updateOne({ issues: id }, {
            $pull: {
                issues: id,
            },
        }, { session });
        yield session.commitTransaction();
        return result;
    }
    catch (error) {
        yield session.abortTransaction();
        throw error;
    }
    finally {
        yield session.endSession();
    }
});
const updateToResolve = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield issueForm_model_1.IssueForm.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `IssueForm not found`);
    }
    const result = yield issueForm_model_1.IssueForm.findOneAndUpdate({ _id: id }, {
        issueStatus: 'resolved',
    }, {
        new: true,
    })
        .populate({
        path: 'boothManagement',
        populate: {
            path: 'issues',
            model: 'IssueForm',
        },
    })
        .populate({
        path: 'boothManagement',
        populate: {
            path: 'ebl365',
            model: 'Ebl365',
        },
    });
    return result;
});
const updateToPending = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield issueForm_model_1.IssueForm.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `IssueForm not found`);
    }
    const result = yield issueForm_model_1.IssueForm.findOneAndUpdate({ _id: id }, {
        issueStatus: 'pending',
    }, {
        new: true,
    })
        .populate({
        path: 'boothManagement',
        populate: {
            path: 'issues',
            model: 'IssueForm',
        },
    })
        .populate({
        path: 'boothManagement',
        populate: {
            path: 'ebl365',
            model: 'Ebl365',
        },
    });
    return result;
});
const getPendingIssues = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield issueForm_model_1.IssueForm.find({ issueStatus: 'pending' })
        .populate({
        path: 'boothManagement',
        populate: {
            path: 'issues',
            model: 'IssueForm',
        },
    })
        .populate({
        path: 'boothManagement',
        populate: {
            path: 'ebl365',
            model: 'Ebl365',
        },
    });
    return result;
});
const getPendingIssuesByEbl365 = (ebl365) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield issueForm_model_1.IssueForm.findOne({ ebl365: ebl365 });
    if (!ifExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `IssueForm not found`);
    }
    const result = yield issueForm_model_1.IssueForm.find({
        ebl365: ebl365,
        issueStatus: 'pending',
    })
        .populate({
        path: 'boothManagement',
        populate: {
            path: 'issues',
            model: 'IssueForm',
        },
    })
        .populate({
        path: 'boothManagement',
        populate: {
            path: 'ebl365',
            model: 'Ebl365',
        },
    });
    return result;
});
const getResolvedIssues = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield issueForm_model_1.IssueForm.find({ issueStatus: 'resolved' })
        .populate({
        path: 'boothManagement',
        populate: {
            path: 'issues',
            model: 'IssueForm',
        },
    })
        .populate({
        path: 'boothManagement',
        populate: {
            path: 'ebl365',
            model: 'Ebl365',
        },
    });
    return result;
});
const getResolvedIssuesByEbl365 = (ebl365) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield issueForm_model_1.IssueForm.findOne({ ebl365: ebl365 });
    if (!ifExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `IssueForm not found`);
    }
    const result = yield issueForm_model_1.IssueForm.find({
        ebl365: ebl365,
        issueStatus: 'resolved',
    })
        .populate({
        path: 'boothManagement',
        populate: {
            path: 'issues',
            model: 'IssueForm',
        },
    })
        .populate({
        path: 'boothManagement',
        populate: {
            path: 'ebl365',
            model: 'Ebl365',
        },
    });
    return result;
});
exports.IssueFormService = {
    createIssueForm,
    getAllIssueForm,
    getSingleIssueForm,
    updateIssueForm,
    deleteIssueForm,
    updateToResolve,
    updateToPending,
    getPendingIssues,
    getResolvedIssues,
    getPendingIssuesByEbl365,
    getResolvedIssuesByEbl365,
};
