import express from 'express';
import Authorization from '../../middleWares/authorization';
import { ENUM_USER_ROLE } from '../user/user.constant';
import { IssueFormController } from './issueForm.controller';

const router = express.Router();

router.get(
  '/ebl-365/:ebl365Id',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
    ENUM_USER_ROLE.VIEWER,
  ),
  IssueFormController.getIssuesByEbl365,
);

router.patch(
  '/resolve/:id',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
  ),
  IssueFormController.updateToResolve,
);

router.patch(
  '/pending/:id',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
  ),
  IssueFormController.updateToPending,
);

router.patch(
  '/in-progress/:id',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
  ),
  IssueFormController.updateToInProgress,
);

router.get(
  '/pending',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
    ENUM_USER_ROLE.VIEWER,
  ),
  IssueFormController.getPendingIssues,
);

router.get(
  '/pending/:ebl365Id',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
    ENUM_USER_ROLE.VIEWER,
  ),
  IssueFormController.getPendingIssuesByEbl365,
);

router.get(
  '/resolved',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
    ENUM_USER_ROLE.VIEWER,
  ),
  IssueFormController.getResolvedIssues,
);

router.get(
  '/resolved/:ebl365Id',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
    ENUM_USER_ROLE.VIEWER,
  ),
  IssueFormController.getResolvedIssuesByEbl365,
);

router.post(
  '/',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
  ),
  IssueFormController.createIssueForm,
);

router.get(
  '/',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
    ENUM_USER_ROLE.VIEWER,
  ),
  IssueFormController.getAllIssueForm,
);

router.patch(
  '/:id',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
  ),
  IssueFormController.updateIssueForm,
);

router.delete(
  '/:id',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  IssueFormController.deleteIssueForm,
);

router.get(
  '/:id',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
    ENUM_USER_ROLE.VIEWER,
  ),
  IssueFormController.getSingleIssueForm,
);

export const IssueFormRoutes = router;
