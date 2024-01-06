"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoothAcquisitionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = require("../../../config/multer");
const authorization_1 = __importDefault(require("../../middleWares/authorization"));
const user_constant_1 = require("../user/user.constant");
const boothAcquisition_controller_1 = require("./boothAcquisition.controller");
const router = express_1.default.Router();
router.get('/unassigned', boothAcquisition_controller_1.BoothAcquisitionController.unAssigned365Booths);
router.post('/', multer_1.upload.fields([
    { name: 'boardMemo', maxCount: 1 },
    { name: 'agreementBetweenEblAndBoothOwner', maxCount: 1 },
]), (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN, user_constant_1.ENUM_USER_ROLE.MAKER), boothAcquisition_controller_1.BoothAcquisitionController.createBoothAcquisition);
router.get('/', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN, user_constant_1.ENUM_USER_ROLE.MAKER, user_constant_1.ENUM_USER_ROLE.VIEWER), boothAcquisition_controller_1.BoothAcquisitionController.getAllBoothAcquisition);
router.delete('/:id', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN), boothAcquisition_controller_1.BoothAcquisitionController.deleteBoothAcquisition);
router.patch('/:id', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN), boothAcquisition_controller_1.BoothAcquisitionController.updateBoothAcquisition);
router.get('/:id', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN, user_constant_1.ENUM_USER_ROLE.MAKER, user_constant_1.ENUM_USER_ROLE.VIEWER), boothAcquisition_controller_1.BoothAcquisitionController.getSingleBoothAcquisition);
exports.BoothAcquisitionRoutes = router;
