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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoothAcquisitionService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const ebl365_model_1 = require("../ebl365/ebl365.model");
const boothAcquisition_constant_1 = require("./boothAcquisition.constant");
const boothAcquisition_model_1 = require("./boothAcquisition.model");
const createBoothAcquisition = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const ebl365Exist = yield ebl365_model_1.Ebl365.findOne({ _id: payload.ebl365 });
    if (!ebl365Exist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `Ebl365 not found`);
    }
    const ifExist = yield boothAcquisition_model_1.BoothAcquisition.findOne({ ebl365: payload.ebl365 });
    if (ifExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, `Booth Acquisition already exist with this booth`);
    }
    const startDate = new Date(payload.boothStartDate);
    const expiryDate = new Date(payload.boothExpiryDate);
    const yearsDiff = expiryDate.getFullYear() - startDate.getFullYear();
    payload.boothContractYear = yearsDiff;
    payload.boothContractMonth = yearsDiff * 12;
    payload.boothPerSqftRent = payload.boothMonthlyRent / payload.boothSize;
    payload.totalBoothRent =
        payload.boothMonthlyRent * payload.boothContractMonth;
    payload.totalAdvancePayment =
        (payload.totalBoothRent * payload.advancePaymentPercentage) / 100;
    payload.monthlyAdvancePayment = payload.totalAdvancePayment / 60;
    payload.monthlyRentAfterAdvancePayment =
        payload.boothMonthlyRent - payload.monthlyAdvancePayment;
    payload.monthlyRentAfterThreeYears =
        payload.monthlyRentAfterAdvancePayment +
            (payload.monthlyRentAfterAdvancePayment * 15) / 100;
    payload.monthlyRentAfterFiveYears =
        payload.monthlyRentAfterThreeYears + payload.monthlyAdvancePayment;
    const currentDate = new Date();
    const monthDifference = (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
        currentDate.getMonth() -
        startDate.getMonth();
    if (monthDifference <= 36) {
        payload.currentMonthlyRent = payload.monthlyRentAfterAdvancePayment;
    }
    else if (monthDifference <= 60) {
        payload.currentMonthlyRent = payload.monthlyRentAfterThreeYears;
    }
    else {
        payload.currentMonthlyRent = payload.monthlyRentAfterFiveYears;
    }
    payload.createdBy = user.userId;
    const result = yield boothAcquisition_model_1.BoothAcquisition.create(payload);
    return result;
});
const getAllBoothAcquisition = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield boothAcquisition_model_1.BoothAcquisition.find()
        .populate('ebl365')
        .populate('createdBy')
        .lean();
    return (0, boothAcquisition_constant_1.cleanData)(result);
});
const getSingleBoothAcquisition = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield boothAcquisition_model_1.BoothAcquisition.findOne({ _id: id });
    if (!ifExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `BoothAcquisition not found`);
    }
    const result = yield boothAcquisition_model_1.BoothAcquisition.findById(id)
        .populate('ebl365')
        .populate('createdBy')
        .lean();
    if (!result) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `BoothAcquisition not found`);
    }
    return (0, boothAcquisition_constant_1.cleanSingleData)(result);
});
const updateBoothAcquisition = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield boothAcquisition_model_1.BoothAcquisition.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `BoothAcquisition not found`);
    }
    const result = yield boothAcquisition_model_1.BoothAcquisition.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).populate('ebl365');
    return result;
});
const deleteBoothAcquisition = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield boothAcquisition_model_1.BoothAcquisition.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `BoothAcquisition not found`);
    }
    const result = yield boothAcquisition_model_1.BoothAcquisition.findOneAndDelete({ _id: id }, { new: true });
    return result;
});
exports.BoothAcquisitionService = {
    createBoothAcquisition,
    getAllBoothAcquisition,
    getSingleBoothAcquisition,
    updateBoothAcquisition,
    deleteBoothAcquisition,
};
