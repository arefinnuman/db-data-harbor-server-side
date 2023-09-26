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
exports.IssueFormController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../custom/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../custom/sendResponse"));
const pick_1 = __importDefault(require("../../../interfaces/pick"));
const issueForm_constant_1 = require("./issueForm.constant");
const issueForm_service_1 = require("./issueForm.service");
const createIssueForm = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = __rest(req.body, []);
    const user = req.user;
    const result = yield issueForm_service_1.IssueFormService.createIssueForm(data, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'IssueForm Created Successfully',
        data: result,
    });
}));
const getAllIssueForm = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, issueForm_constant_1.IssueFormFilterableFields);
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield issueForm_service_1.IssueFormService.getAllIssueForm(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `IssueForm Data Fetched Successfully`,
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleIssueForm = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield issueForm_service_1.IssueFormService.getSingleIssueForm(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `IssueForm data fetched successfully`,
        data: result,
    });
}));
const updateIssueForm = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const result = yield issueForm_service_1.IssueFormService.updateIssueForm(id, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `IssueForm updated successfully`,
        data: result,
    });
}));
const deleteIssueForm = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield issueForm_service_1.IssueFormService.deleteIssueForm(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `IssueForm deleted successfully`,
        data: result || null,
    });
}));
const updateToResolve = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield issueForm_service_1.IssueFormService.updateToResolve(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `IssueForm updated successfully`,
        data: result,
    });
}));
const updateToPending = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield issueForm_service_1.IssueFormService.updateToPending(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `IssueForm updated successfully`,
        data: result,
    });
}));
const getPendingIssues = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield issueForm_service_1.IssueFormService.getPendingIssues();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `IssueForm data fetched successfully`,
        data: result,
    });
}));
const getPendingIssuesByEbl365 = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ebl365 = req.params.id;
    const result = yield issueForm_service_1.IssueFormService.getPendingIssuesByEbl365(ebl365);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `IssueForm data fetched successfully`,
        data: result,
    });
}));
const getResolvedIssues = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield issueForm_service_1.IssueFormService.getResolvedIssues();
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `IssueForm data fetched successfully`,
        data: result,
    });
}));
const getResolvedIssuesByEbl365 = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ebl365 = req.params.id;
    const result = yield issueForm_service_1.IssueFormService.getResolvedIssuesByEbl365(ebl365);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `IssueForm data fetched successfully`,
        data: result,
    });
}));
const getIssuesByEbl365 = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ebl365 = req.params.id;
    const result = yield issueForm_service_1.IssueFormService.getIssuesByEbl365(ebl365);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `IssueForm data fetched successfully`,
        data: result,
    });
}));
exports.IssueFormController = {
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
    getIssuesByEbl365,
};
