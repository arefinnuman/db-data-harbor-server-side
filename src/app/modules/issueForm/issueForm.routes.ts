import express from 'express';
import { IssueFormController } from './issueForm.controller';

const router = express.Router();

router.patch('/resolve/:id', IssueFormController.updateToResolve);

router.patch('/pending/:id', IssueFormController.updateToPending);

router.get('/pending', IssueFormController.getPendingIssues);

router.get('/pending/:id', IssueFormController.getPendingIssuesByEbl365);

router.get('/resolved', IssueFormController.getResolvedIssues);

router.get('/resolved/:id', IssueFormController.getResolvedIssuesByEbl365);

router.post('/', IssueFormController.createIssueForm);

router.get('/', IssueFormController.getAllIssueForm);

router.patch('/:id', IssueFormController.updateIssueForm);

router.delete('/:id', IssueFormController.deleteIssueForm);

router.get('/:id', IssueFormController.getSingleIssueForm);

export const IssueFormRoutes = router;
