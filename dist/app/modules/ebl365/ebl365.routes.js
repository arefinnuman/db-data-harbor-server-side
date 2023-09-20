"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ebl365Routes = void 0;
const express_1 = __importDefault(require("express"));
const authorization_1 = __importDefault(require("../../middleWares/authorization"));
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const user_constant_1 = require("../user/user.constant");
const ebl365_controller_1 = require("./ebl365.controller");
const ebl365_validation_1 = require("./ebl365.validation");
const router = express_1.default.Router();
router.post('/', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN, user_constant_1.ENUM_USER_ROLE.MAKER), (0, validateRequest_1.default)(ebl365_validation_1.Ebl365Validation.createEbl365ZodSchema), ebl365_controller_1.Ebl365Controller.createEbl365);
router.get('/', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN, user_constant_1.ENUM_USER_ROLE.MAKER, user_constant_1.ENUM_USER_ROLE.VIEWER), ebl365_controller_1.Ebl365Controller.getAllEbl365);
router.patch('/:id', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(ebl365_validation_1.Ebl365Validation.updateEbl365ZodSchema), ebl365_controller_1.Ebl365Controller.updateEbl365);
router.delete('/:id', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN), ebl365_controller_1.Ebl365Controller.deleteEbl365);
router.get('/:id', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN, user_constant_1.ENUM_USER_ROLE.MAKER, user_constant_1.ENUM_USER_ROLE.VIEWER), ebl365_controller_1.Ebl365Controller.getSingleEbl365);
exports.Ebl365Routes = router;
