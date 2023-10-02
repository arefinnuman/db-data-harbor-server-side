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
exports.BookValueReportService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const assetBookValue_model_1 = require("../assetBookValue/assetBookValue.model");
const bookValueReport_constant_1 = require("./bookValueReport.constant");
const bookValueReport_model_1 = require("./bookValueReport.model");
const createBookValueReport = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const assetBookValue = yield assetBookValue_model_1.AssetBookValue.findOne({
        _id: payload.assetBookValue,
    });
    if (!assetBookValue) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'AssetBookValue not found');
    }
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
    const { machineAge, firstDeploymentDate, purchasePrice, assetAmcAmount } = assetBookValue;
    payload.machineAgeInDays = machineAge * 365;
    const firstDepDate = new Date(firstDeploymentDate);
    if (isNaN(firstDepDate.getTime())) {
        throw new Error('Invalid firstDeploymentDate');
    }
    payload.assetExpiryDate = new Date(firstDepDate.getTime() + payload.machineAgeInDays * oneDayInMilliseconds);
    payload.amcInDays = payload.machineAgeInDays - 365;
    if (!(payload.reportingDate instanceof Date)) {
        payload.reportingDate = new Date(payload.reportingDate);
    }
    if (isNaN(payload.reportingDate.getTime())) {
        throw new Error('Invalid reportingDate');
    }
    payload.runningMachineRealAge = Math.round((payload.reportingDate.getTime() - firstDepDate.getTime()) /
        oneDayInMilliseconds);
    payload.totalRemainingForAmc =
        payload.amcInDays - payload.runningMachineRealAge;
    payload.ageRunning = (0, bookValueReport_constant_1.daysToYearsMonthsDays)(payload.runningMachineRealAge);
    payload.ageRemaining = (0, bookValueReport_constant_1.daysToYearsMonthsDays)(payload.totalRemainingForAmc);
    payload.perDayAssetDepreciation = purchasePrice / payload.machineAgeInDays;
    payload.assetDeprecationAmount =
        payload.perDayAssetDepreciation * payload.runningMachineRealAge;
    payload.remainingBookValue =
        payload.perDayAssetDepreciation *
            (payload.machineAgeInDays - payload.runningMachineRealAge);
    payload.depCount = payload.remainingBookValue;
    payload.machineCost = payload.depCount + payload.assetDeprecationAmount;
    payload.amcForYear = machineAge;
    payload.amcPerDay = assetAmcAmount / 365;
    payload.machineAgeTillToday = payload.runningMachineRealAge;
    payload.dayForAmcPayment = payload.machineAgeTillToday - 365;
    payload.amcGiven = payload.dayForAmcPayment * payload.amcPerDay;
    payload.amcRemaining =
        payload.amcPerDay * payload.amcInDays - payload.amcGiven;
    payload.assetAmcRemaining = payload.amcRemaining;
    payload.totalCostOwnerShip = payload.machineCost + payload.assetAmcRemaining;
    if (user === null || user === void 0 ? void 0 : user.userId) {
        payload.createdBy = user.userId;
    }
    const result = yield (yield bookValueReport_model_1.BookValueReport.create(payload)).populate('assetBookValue');
    return result;
});
const createAllBookValueReports = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    let date;
    if (data.reportingDate) {
        date = data.reportingDate;
    }
    else {
        date = new Date();
    }
    const allAssetBookValues = yield assetBookValue_model_1.AssetBookValue.find();
    const allReports = yield Promise.all(allAssetBookValues.map((assetBookValue) => __awaiter(void 0, void 0, void 0, function* () {
        const payload = {
            assetBookValue: assetBookValue._id,
            reportingDate: date,
        };
        return createBookValueReport(payload, user);
    })));
    return allReports;
});
const createSelectedBookValueReports = (user, selectedAssetBookValueIds, reportingDate) => __awaiter(void 0, void 0, void 0, function* () {
    let date;
    if (reportingDate) {
        date = reportingDate;
    }
    else {
        date = new Date();
    }
    const selectedAssetBookValues = yield assetBookValue_model_1.AssetBookValue.find({
        _id: { $in: selectedAssetBookValueIds },
    });
    if (selectedAssetBookValues.length === 0) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'No asset book values found for the provided IDs.');
    }
    const allReports = yield Promise.all(selectedAssetBookValues.map((assetBookValue) => __awaiter(void 0, void 0, void 0, function* () {
        const payload = {
            assetBookValue: assetBookValue._id,
            reportingDate: date,
        };
        return createBookValueReport(payload, user);
    })));
    return allReports;
});
const getAllBookValueReport = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: bookValueReport_constant_1.BookValueReportSearchableFields.map((field) => ({
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
    const result = yield bookValueReport_model_1.BookValueReport.find(whereConditions)
        .populate('assetBookValue')
        .populate('createdBy')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield bookValueReport_model_1.BookValueReport.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleBookValueReport = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield bookValueReport_model_1.BookValueReport.findOne({ _id: id });
    if (!ifExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `BookValueReport not found`);
    }
    const result = yield bookValueReport_model_1.BookValueReport.findById(id)
        .populate('machines')
        .populate('createdBy');
    return result;
});
const updateBookValueReport = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield bookValueReport_model_1.BookValueReport.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `BookValueReport not found`);
    }
    const result = yield bookValueReport_model_1.BookValueReport.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    })
        .populate('machines')
        .populate('createdUser');
    return result;
});
const deleteBookValueReport = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield bookValueReport_model_1.BookValueReport.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, `BookValueReport not found`);
    }
    const result = yield bookValueReport_model_1.BookValueReport.findOneAndDelete({ _id: id }, { new: true });
    return result;
});
const getUniqueReportingTimeBookValueReports = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bookValueReport_model_1.BookValueReport.aggregate([
        {
            $group: {
                _id: {
                    assetBookValue: '$assetBookValue',
                    reportingDate: '$reportingDate',
                },
                doc: { $first: '$$ROOT' },
            },
        },
        {
            $replaceRoot: { newRoot: '$doc' },
        },
    ]).exec();
    const populatedResults = yield bookValueReport_model_1.BookValueReport.populate(result, []);
    return populatedResults;
});
exports.BookValueReportService = {
    createBookValueReport,
    createAllBookValueReports,
    createSelectedBookValueReports,
    getAllBookValueReport,
    getSingleBookValueReport,
    updateBookValueReport,
    deleteBookValueReport,
    getUniqueReportingTimeBookValueReports,
};
