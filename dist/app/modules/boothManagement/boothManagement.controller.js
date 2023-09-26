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
exports.BoothManagementController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../custom/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../custom/sendResponse"));
const pick_1 = __importDefault(require("../../../interfaces/pick"));
const boothManagement_constant_1 = require("./boothManagement.constant");
const boothManagement_service_1 = require("./boothManagement.service");
const createBoothManagement = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = __rest(req.body, []);
    const user = req.user;
    const result = yield boothManagement_service_1.BoothManagementService.createBoothManagement(data, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'BoothManagement Created Successfully',
        data: result,
    });
}));
const getAllBoothManagement = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, boothManagement_constant_1.BoothManagementFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield boothManagement_service_1.BoothManagementService.getAllBoothManagement(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `BoothManagement Data Fetched Successfully`,
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleBoothManagement = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield boothManagement_service_1.BoothManagementService.getSingleBoothManagement(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `BoothManagement data fetched successfully`,
        data: result,
    });
}));
const getBoothManagementByEbl365 = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ebl365Id = req.params.id;
    const result = yield boothManagement_service_1.BoothManagementService.getBoothManagementByEbl365(ebl365Id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `BoothManagement data fetched successfully`,
        data: result,
    });
}));
const updateBoothManagement = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield boothManagement_service_1.BoothManagementService.updateBoothManagement(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `BoothManagement updated successfully`,
        data: result,
    });
}));
const deleteBoothManagement = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield boothManagement_service_1.BoothManagementService.deleteBoothManagement(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `BoothManagement deleted successfully`,
        data: result || null,
    });
}));
exports.BoothManagementController = {
    createBoothManagement,
    getAllBoothManagement,
    getSingleBoothManagement,
    getBoothManagementByEbl365,
    updateBoothManagement,
    deleteBoothManagement,
};
