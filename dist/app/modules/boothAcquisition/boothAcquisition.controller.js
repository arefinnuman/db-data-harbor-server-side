"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoothAcquisitionController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../custom/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../custom/sendResponse"));
const boothAcquisition_service_1 = require("./boothAcquisition.service");
const createBoothAcquisition = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const boardMemoFile = req.files['boardMemo'];
    const agreementFile = req.files['agreementBetweenEblAndBoothOwner'];
    if (!boardMemoFile || !agreementFile) {
        throw new Error('Files are missing');
    }
    const user = req.user;
    const payload = Object.assign(Object.assign({}, req.body), { boardMemo: boardMemoFile[0].path, agreementBetweenEblAndBoothOwner: agreementFile[0].path });
    const result = yield boothAcquisition_service_1.BoothAcquisitionService.createBoothAcquisition(payload, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'BoothAcquisition Created Successfully',
        data: result,
    });
}));
const getAllBoothAcquisition = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield boothAcquisition_service_1.BoothAcquisitionService.getAllBoothAcquisition();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'BoothAcquisition Data Fetched Successfully',
        data: result,
    });
}));
const getSingleBoothAcquisition = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield boothAcquisition_service_1.BoothAcquisitionService.getSingleBoothAcquisition(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `BoothAcquisition data fetched successfully`,
        data: result,
    });
}));
const updateBoothAcquisition = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield boothAcquisition_service_1.BoothAcquisitionService.updateBoothAcquisition(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `BoothAcquisition updated successfully`,
        data: result,
    });
}));
const deleteBoothAcquisition = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield boothAcquisition_service_1.BoothAcquisitionService.deleteBoothAcquisition(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `BoothAcquisition deleted successfully`,
        data: result || null,
    });
}));
const unAssigned365Booths = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield boothAcquisition_service_1.BoothAcquisitionService.unAssigned365Booths();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Unassigned 365 booths fetched successfully`,
        data: result,
    });
}));
exports.BoothAcquisitionController = {
    createBoothAcquisition,
    getAllBoothAcquisition,
    getSingleBoothAcquisition,
    updateBoothAcquisition,
    deleteBoothAcquisition,
    unAssigned365Booths,
};
