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
exports.BoothManagementService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const ebl365_model_1 = require("../ebl365/ebl365.model");
const boothManagement_constant_1 = require("./boothManagement.constant");
const boothManagement_model_1 = require("./boothManagement.model");
const createBoothManagement = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const ebl365Exist = yield ebl365_model_1.Ebl365.findOne({ _id: payload.ebl365 });
    if (!ebl365Exist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `Ebl365 not found`);
    }
    const ifExist = yield boothManagement_model_1.BoothManagement.findOne({ ebl365: payload.ebl365 });
    if (ifExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, `BoothManagement already exist with this booth`);
    }
    const ebl365 = yield ebl365_model_1.Ebl365.findOne({ _id: payload.ebl365 });
    payload.numberOfMachine = ebl365 === null || ebl365 === void 0 ? void 0 : ebl365.noOfAvailableMachine;
    payload.createdBy = user === null || user === void 0 ? void 0 : user.userId;
    const result = yield boothManagement_model_1.BoothManagement.create(payload);
    const populateResult = result.populate('ebl365');
    return populateResult;
});
const getAllBoothManagement = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: boothManagement_constant_1.BoothManagementSearchableFields.map((field) => ({
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
    const result = yield boothManagement_model_1.BoothManagement.find(whereConditions)
        .populate('ebl365')
        .populate('issues')
        .populate('createdBy')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield boothManagement_model_1.BoothManagement.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleBoothManagement = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield boothManagement_model_1.BoothManagement.findOne({ _id: id });
    if (!ifExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `BoothManagement not found`);
    }
    const result = yield boothManagement_model_1.BoothManagement.findById(id)
        .populate('ebl365')
        .populate('issues')
        .populate('createdBy');
    if (!result) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `BoothManagement not found`);
    }
    return result;
});
const getBoothManagementByEbl365 = (ebl365Id) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield boothManagement_model_1.BoothManagement.findOne({ ebl365: ebl365Id });
    if (!ifExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `BoothManagement not found`);
    }
    const result = yield boothManagement_model_1.BoothManagement.findOne({ ebl365: ebl365Id })
        .populate('ebl365')
        .populate('issues')
        .populate('createdBy');
    if (!result) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `BoothManagement not found`);
    }
    return result;
});
const updateBoothManagement = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield boothManagement_model_1.BoothManagement.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `BoothManagement not found`);
    }
    const result = yield boothManagement_model_1.BoothManagement.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).populate('ebl365');
    return result;
});
const deleteBoothManagement = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield boothManagement_model_1.BoothManagement.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `BoothManagement not found`);
    }
    const result = yield boothManagement_model_1.BoothManagement.findOneAndDelete({ _id: id }, { new: true });
    return result;
});
const unAssigned365Booths = () => __awaiter(void 0, void 0, void 0, function* () {
    const allEbl365 = yield ebl365_model_1.Ebl365.find({});
    const allEbl365Ids = allEbl365.map(ebl365 => ebl365._id);
    const assignedEbl365 = yield boothManagement_model_1.BoothManagement.find({
        ebl365: { $in: allEbl365Ids },
    });
    const assignedEbl365Ids = assignedEbl365.map(boothManagement => boothManagement.ebl365);
    const unassignedEbl365Ids = allEbl365Ids.filter(id => !assignedEbl365Ids.some(assignedId => assignedId.equals(id)));
    const resultIds = unassignedEbl365Ids.map(id => new ebl365_model_1.Ebl365({ _id: id }));
    const unassignedEbl365 = yield ebl365_model_1.Ebl365.find({
        _id: { $in: resultIds },
    });
    return unassignedEbl365;
});
exports.BoothManagementService = {
    createBoothManagement,
    getAllBoothManagement,
    getSingleBoothManagement,
    getBoothManagementByEbl365,
    updateBoothManagement,
    deleteBoothManagement,
    unAssigned365Booths,
};
