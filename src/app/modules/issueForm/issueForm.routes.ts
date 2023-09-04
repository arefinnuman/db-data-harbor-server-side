import express from 'express';
import { IssueFormController } from './issueForm.controller';

const router = express.Router();

router.post('/', IssueFormController.createIssueForm);

router.get('/', IssueFormController.getAllIssueForm);

router.patch('/:id', IssueFormController.updateIssueForm);

router.delete('/:id', IssueFormController.deleteIssueForm);

router.get('/:id', IssueFormController.getSingleIssueForm);

export const IssueFormRoutes = router;
