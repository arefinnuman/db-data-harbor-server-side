"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoothManagementRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authorization_1 = __importDefault(require("../../middleWares/authorization"));
const user_constant_1 = require("../user/user.constant");
const boothManagement_controller_1 = require("./boothManagement.controller");
const router = express_1.default.Router();
router.post('/', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN, user_constant_1.ENUM_USER_ROLE.MAKER), boothManagement_controller_1.BoothManagementController.createBoothManagement);
router.get('/', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN, user_constant_1.ENUM_USER_ROLE.MAKER, user_constant_1.ENUM_USER_ROLE.VIEWER), boothManagement_controller_1.BoothManagementController.getAllBoothManagement);
router.get('/ebl-365/:id', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN, user_constant_1.ENUM_USER_ROLE.MAKER, user_constant_1.ENUM_USER_ROLE.VIEWER), boothManagement_controller_1.BoothManagementController.getBoothManagementByEbl365);
router.patch('/:id', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN), boothManagement_controller_1.BoothManagementController.updateBoothManagement);
router.delete('/:id', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN), boothManagement_controller_1.BoothManagementController.deleteBoothManagement);
router.get('/:id', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN, user_constant_1.ENUM_USER_ROLE.MAKER, user_constant_1.ENUM_USER_ROLE.VIEWER), boothManagement_controller_1.BoothManagementController.getSingleBoothManagement);
exports.BoothManagementRoutes = router;
