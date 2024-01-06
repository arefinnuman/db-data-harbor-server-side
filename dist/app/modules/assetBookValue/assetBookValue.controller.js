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
exports.AssetBookValueController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../custom/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../custom/sendResponse"));
const pick_1 = __importDefault(require("../../../interfaces/pick"));
const assetBookValue_constant_1 = require("./assetBookValue.constant");
const assetBookValue_service_1 = require("./assetBookValue.service");
const createAssetBookValue = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = __rest(req.body, []);
    const user = req.user;
    const result = yield assetBookValue_service_1.AssetBookValueService.createAssetBookValue(data, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'AssetBookValue Created Successfully',
        data: result,
    });
}));
const getAllAssetBookValue = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, assetBookValue_constant_1.AssetBookValueFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield assetBookValue_service_1.AssetBookValueService.getAllAssetBookValue(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `AssetBookValue Data Fetched Successfully`,
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleAssetBookValue = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield assetBookValue_service_1.AssetBookValueService.getSingleAssetBookValue(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `AssetBookValue data fetched successfully`,
        data: result,
    });
}));
const updateAssetBookValue = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield assetBookValue_service_1.AssetBookValueService.updateAssetBookValue(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `AssetBookValue updated successfully`,
        data: result,
    });
}));
const deleteAssetBookValue = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield assetBookValue_service_1.AssetBookValueService.deleteAssetBookValue(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `AssetBookValue deleted successfully`,
        data: result || null,
    });
}));
const getAssetValueByTerminalId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield assetBookValue_service_1.AssetBookValueService.getAssetValueByTerminalId(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `AssetBookValue data fetched successfully`,
        data: result,
    });
}));
const unAssignedTerminalsInAssetBookValue = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield assetBookValue_service_1.AssetBookValueService.unAssignedTerminalsInAssetBookValue();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `AssetBookValue data fetched successfully`,
        data: result,
    });
}));
exports.AssetBookValueController = {
    createAssetBookValue,
    getAllAssetBookValue,
    getSingleAssetBookValue,
    updateAssetBookValue,
    deleteAssetBookValue,
    getAssetValueByTerminalId,
    unAssignedTerminalsInAssetBookValue,
};
