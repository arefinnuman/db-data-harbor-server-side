"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetBookValueRoutes = void 0;
const express_1 = __importDefault(require("express"));
const authorization_1 = __importDefault(require("../../middleWares/authorization"));
const user_constant_1 = require("../user/user.constant");
const assetBookValue_controller_1 = require("./assetBookValue.controller");
const router = express_1.default.Router();
router.post('/', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN, user_constant_1.ENUM_USER_ROLE.MAKER), assetBookValue_controller_1.AssetBookValueController.createAssetBookValue);
router.get('/', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN, user_constant_1.ENUM_USER_ROLE.MAKER, user_constant_1.ENUM_USER_ROLE.VIEWER), assetBookValue_controller_1.AssetBookValueController.getAllAssetBookValue);
router.patch('/:id', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN), assetBookValue_controller_1.AssetBookValueController.updateAssetBookValue);
router.delete('/:id', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN), assetBookValue_controller_1.AssetBookValueController.deleteAssetBookValue);
router.get('/:id', (0, authorization_1.default)(user_constant_1.ENUM_USER_ROLE.SUPER_ADMIN, user_constant_1.ENUM_USER_ROLE.ADMIN, user_constant_1.ENUM_USER_ROLE.MAKER, user_constant_1.ENUM_USER_ROLE.VIEWER), assetBookValue_controller_1.AssetBookValueController.getSingleAssetBookValue);
exports.AssetBookValueRoutes = router;
