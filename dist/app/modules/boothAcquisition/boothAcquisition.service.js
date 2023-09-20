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
const boothAcquisition_model_1 = require("./boothAcquisition.model");
const createBoothAcquisition = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield boothAcquisition_model_1.BoothAcquisition.create(payload);
    return result;
});
const getAllBoothAcquisition = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield boothAcquisition_model_1.BoothAcquisition.find().populate('ebl365');
    return result;
});
const getSingleBoothAcquisition = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield boothAcquisition_model_1.BoothAcquisition.findOne({ _id: id });
    if (!ifExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `BoothAcquisition not found`);
    }
    const result = yield boothAcquisition_model_1.BoothAcquisition.findById(id).populate('ebl365');
    if (!result) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `BoothAcquisition not found`);
    }
    return result;
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
