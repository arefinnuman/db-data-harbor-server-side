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
exports.Ebl365Service = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require('http-status'));
const apiError_1 = __importDefault(require('../../../errors/apiError'));
const paginationHelper_1 = require('../../../helper/paginationHelper');
const ebl365_constant_1 = require('./ebl365.constant');
const ebl365_model_1 = require('./ebl365.model');
const createEbl365 = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (yield ebl365_model_1.Ebl365.create(payload)).populate(
      'machines',
    );
    const machineTypeCounts = {};
    for (const machine of result.machines) {
      if (machineTypeCounts[machine.terminalType]) {
        machineTypeCounts[machine.terminalType] += 1;
      } else {
        machineTypeCounts[machine.terminalType] = 1;
      }
    }
    const boothDevicesArray = Object.keys(machineTypeCounts).map(
      type => `${machineTypeCounts[type]} ${type}`,
    );
    let boothDevicesStr = '';
    if (boothDevicesArray.length > 1) {
      boothDevicesStr =
        boothDevicesArray.slice(0, -1).join(', ') +
        ' and ' +
        boothDevicesArray.slice(-1);
    } else {
      boothDevicesStr = boothDevicesArray[0] || '';
    }
    result.boothDevices = boothDevicesStr;
    yield ebl365_model_1.Ebl365.findByIdAndUpdate(result._id, {
      boothDevices: boothDevicesStr,
    });
    return result;
  });
const getAllEbl365 = (filters, paginationOptions) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters,
      filtersData = __rest(filters, ['searchTerm']);
    const andConditions = [];
    if (searchTerm) {
      andConditions.push({
        $or: ebl365_constant_1.Ebl365SearchableFields.map(field => ({
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
    const result = yield ebl365_model_1.Ebl365.find(whereConditions)
      .populate('machines')
      .sort(sortConditions)
      .skip(skip)
      .limit(limit);
    const total = yield ebl365_model_1.Ebl365.countDocuments();
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  });
const getSingleEbl365 = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const ifExist = yield ebl365_model_1.Ebl365.findOne({ _id: id });
    if (!ifExist) {
      throw new apiError_1.default(
        http_status_1.default.NOT_FOUND,
        `Ebl365 not found`,
      );
    }
    const result =
      yield ebl365_model_1.Ebl365.findById(id).populate('machines');
    if (!result) {
      throw new apiError_1.default(
        http_status_1.default.NOT_FOUND,
        `Ebl365 not found`,
      );
    }
    return result;
  });
const updateEbl365 = (id, payload) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield ebl365_model_1.Ebl365.findOne({ _id: id });
    if (!isExist) {
      throw new apiError_1.default(
        http_status_1.default.NOT_FOUND,
        `Ebl365 not found`,
      );
    }
    const result = yield ebl365_model_1.Ebl365.findOneAndUpdate(
      { _id: id },
      payload,
      {
        new: true,
      },
    ).populate('machines');
    return result;
  });
const deleteEbl365 = id =>
  __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield ebl365_model_1.Ebl365.findOne({ _id: id });
    if (!isExist) {
      throw new apiError_1.default(
        http_status_1.default.NOT_FOUND,
        `Ebl365 not found`,
      );
    }
    const result = yield ebl365_model_1.Ebl365.findOneAndDelete(
      { _id: id },
      { new: true },
    );
    return result;
  });
exports.Ebl365Service = {
  createEbl365,
  getAllEbl365,
  getSingleEbl365,
  updateEbl365,
  deleteEbl365,
};
