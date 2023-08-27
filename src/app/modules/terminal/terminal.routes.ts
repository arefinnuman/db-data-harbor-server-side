import express from 'express';
import { TerminalController } from './terminal.controller';

const router = express.Router();

router.post('/', TerminalController.createTerminal);

router.get('/', TerminalController.getAllTerminal);

router.patch('/:id', TerminalController.updateTerminal);

router.delete('/:id', TerminalController.deleteTerminal);

router.get('/:id', TerminalController.getSingleTerminal);

export const TerminalRoutes = router;
