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
exports.AssetBookValueService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const terminal_model_1 = require("./../terminal/terminal.model");
const assetBookValue_constant_1 = require("./assetBookValue.constant");
const assetBookValue_model_1 = require("./assetBookValue.model");
const createAssetBookValue = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield terminal_model_1.Terminal.findOne({ _id: payload.terminal });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, `Terminal is not exist`);
    }
    const terminalIfExist = yield assetBookValue_model_1.AssetBookValue.findOne({
        terminal: payload.terminal,
    });
    if (terminalIfExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, `AssetBookValue already exist for this terminal`);
    }
    payload.createdBy = user === null || user === void 0 ? void 0 : user.userId;
    const result = yield (yield assetBookValue_model_1.AssetBookValue.create(payload)).populate('terminal');
    return result;
});
const getAllAssetBookValue = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: assetBookValue_constant_1.AssetBookValueSearchableFields.map((field) => ({
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
    const result = yield assetBookValue_model_1.AssetBookValue.find(whereConditions)
        .populate('terminal')
        .populate('createdBy')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield assetBookValue_model_1.AssetBookValue.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleAssetBookValue = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield assetBookValue_model_1.AssetBookValue.findOne({ _id: id });
    if (!ifExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `AssetBookValue not found`);
    }
    const result = yield assetBookValue_model_1.AssetBookValue.findById(id)
        .populate('terminal')
        .populate('createdBy');
    return result;
});
const updateAssetBookValue = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield assetBookValue_model_1.AssetBookValue.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `AssetBookValue not found`);
    }
    const result = yield assetBookValue_model_1.AssetBookValue.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).populate('terminal');
    return result;
});
const deleteAssetBookValue = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield assetBookValue_model_1.AssetBookValue.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `AssetBookValue not found`);
    }
    const result = yield assetBookValue_model_1.AssetBookValue.findOneAndDelete({ _id: id }, { new: true });
    return result;
});
const getAssetValueByTerminalId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield assetBookValue_model_1.AssetBookValue.findOne({ terminal: id })
        .populate('terminal')
        .populate('createdBy');
    return result;
});
const unAssignedTerminalsInAssetBookValue = () => __awaiter(void 0, void 0, void 0, function* () {
    const allTerminals = yield terminal_model_1.Terminal.find({});
    const allTerminalIds = allTerminals.map(terminal => terminal._id);
    const assignedTerminals = yield assetBookValue_model_1.AssetBookValue.find({
        terminal: { $in: allTerminalIds },
    });
    const assignedTerminalIds = assignedTerminals.map(assetBookValue => assetBookValue.terminal);
    const unassignedTerminalIds = allTerminalIds.filter(id => !assignedTerminalIds.some(assignedId => assignedId.equals(id)));
    const resultIds = unassignedTerminalIds.map(id => new terminal_model_1.Terminal({ _id: id }));
    const unassignedTerminals = yield terminal_model_1.Terminal.find({
        _id: { $in: resultIds },
    });
    console.log(unassignedTerminals.length);
    return unassignedTerminals;
});
exports.AssetBookValueService = {
    createAssetBookValue,
    getAllAssetBookValue,
    getSingleAssetBookValue,
    getAssetValueByTerminalId,
    updateAssetBookValue,
    deleteAssetBookValue,
    unAssignedTerminalsInAssetBookValue,
};
