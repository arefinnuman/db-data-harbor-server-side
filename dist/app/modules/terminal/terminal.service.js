'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.TerminalService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const mongoose_1 = __importDefault(require('mongoose'));
const apiError_1 = __importDefault(require('../../../errors/apiError'));
const paginationHelper_1 = require('../../../helper/paginationHelper');
const ebl365_model_1 = require('../ebl365/ebl365.model');
const terminal_constant_1 = require('./terminal.constant');
const terminal_model_1 = require('./terminal.model');
const createTerminal = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield terminal_model_1.Terminal.create(payload);
    return result;
  });
const getAllTerminal = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        $or: terminal_constant_1.TerminalSearchableFields.map(field => ({
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
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelper_1.PaginationHelpers.calculatePagination(
        paginationOptions,
      );
    const sortConditions = {};
    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder;
    }
    const whereConditions =
      andConditions.length > 0
        ? {
            $and: andConditions,
          }
        : {};
    const result = yield terminal_model_1.Terminal.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    const total = yield terminal_model_1.Terminal.countDocuments();
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
const getSingleTerminal = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield terminal_model_1.Terminal.findOne({ _id: id });
    if (!ifExist) {
      throw new apiError_1.default(
        http_status_1.default.NOT_FOUND,
        `Terminal not found`,
      );
    }
    const result = yield terminal_model_1.Terminal.findById(id);
    if (!result) {
      throw new apiError_1.default(
        http_status_1.default.NOT_FOUND,
        `Terminal not found`,
      );
    }
    return result;
  });
const updateTerminal = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield terminal_model_1.Terminal.findOne({ _id: id });
    if (!isExist) {
      throw new apiError_1.default(
        http_status_1.default.NOT_FOUND,
        `Terminal not found`,
      );
    }
    const result = yield terminal_model_1.Terminal.findOneAndUpdate(
      { _id: id },
      payload,
      {
        new: true,
      },
    );
    return result;
  });
const deleteTerminal = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield terminal_model_1.Terminal.findOne({ _id: id });
    if (!isExist) {
      throw new apiError_1.default(
        http_status_1.default.NOT_FOUND,
        `Terminal not found`,
      );
    }
    const result = yield terminal_model_1.Terminal.findOneAndDelete(
      { _id: id },
      { new: true },
    );
    return result;
  });
const createTerminalIntoEbl365 = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    let newTerminal;
    const session = yield mongoose_1.default.startSession();
    try {
      session.startTransaction();
      const ebl365 = yield ebl365_model_1.Ebl365.findOne({
        _id: payload.terminal365,
      }).session(session);
      if (!ebl365) {
        throw new apiError_1.default(
          http_status_1.default.NOT_FOUND,
          `Ebl365 not found`,
        );
      }
      const createdTerminal = yield terminal_model_1.Terminal.create(
        [payload],
        { session },
      );
      newTerminal = createdTerminal[0];
      console.log('newTerminal', newTerminal);
      const res = yield ebl365_model_1.Ebl365.updateOne(
        { _id: payload.terminal365 },
        {
          $push: {
            machines: newTerminal._id,
          },
        },
        { session },
      );
      console.log('res', res);
      yield session.commitTransaction();
    } catch (error) {
      yield session.abortTransaction();
      throw error;
    } finally {
      yield session.endSession();
    }
    return newTerminal;
  });
exports.TerminalService = {
  createTerminal,
  getAllTerminal,
  getSingleTerminal,
  updateTerminal,
  deleteTerminal,
  createTerminalIntoEbl365,
};
