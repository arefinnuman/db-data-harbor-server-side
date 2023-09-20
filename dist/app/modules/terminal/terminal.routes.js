"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authorization_1 = __importDefault(require("../../middleWares/authorization"));
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const user_constant_1 = require("../user/user.constant");
const terminal_controller_1 = require("./terminal.controller");
const terminal_validation_1 = require("./terminal.validation");
const router = express_1.default.Router();
router.post('/', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN, user_constant_1.ENUM_USER_ROLE.MAKER), (0, validateRequest_1.default)(terminal_validation_1.TerminalValidation.createTerminalZodSchema), terminal_controller_1.TerminalController.createTerminal);
router.get('/', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN, user_constant_1.ENUM_USER_ROLE.MAKER, user_constant_1.ENUM_USER_ROLE.VIEWER), terminal_controller_1.TerminalController.getAllTerminal);
router.patch('/:id', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(terminal_validation_1.TerminalValidation.updateTerminalZodSchema), terminal_controller_1.TerminalController.updateTerminal);
router.delete('/:id', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN), terminal_controller_1.TerminalController.deleteTerminal);
router.get('/:id', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN, user_constant_1.ENUM_USER_ROLE.MAKER, user_constant_1.ENUM_USER_ROLE.VIEWER), terminal_controller_1.TerminalController.getSingleTerminal);
exports.TerminalRoutes = router;
