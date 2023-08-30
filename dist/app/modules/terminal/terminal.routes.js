"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TerminalRoutes = void 0;
const express_1 = __importDefault(require("express"));
const terminal_controller_1 = require("./terminal.controller");
const router = express_1.default.Router();
router.post('/create-terminal-ebl', terminal_controller_1.TerminalController.createTerminalIntoEbl365);
router.post('/', terminal_controller_1.TerminalController.createTerminal);
router.get('/', terminal_controller_1.TerminalController.getAllTerminal);
router.patch('/:id', terminal_controller_1.TerminalController.updateTerminal);
router.delete('/:id', terminal_controller_1.TerminalController.deleteTerminal);
router.get('/:id', terminal_controller_1.TerminalController.getSingleTerminal);
exports.TerminalRoutes = router;
