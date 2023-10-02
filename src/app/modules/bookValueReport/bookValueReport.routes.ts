import express from 'express';
import Authorization from '../../middleWares/authorization';
import { ENUM_USER_ROLE } from '../user/user.constant';
import { BookValueReportController } from './bookValueReport.controller';

const router = express.Router();

router.get(
  '/unique',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
  ),
  BookValueReportController.getUniqueReportingTimeBookValueReports,
);

router.post(
  '/all',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
  ),
  BookValueReportController.createAllBookValueReports,
);

router.post(
  '/selected',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
  ),
  BookValueReportController.createSelectedBookValueReports,
);

router.post(
  '/',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
  ),
  BookValueReportController.createBookValueReport,
);

router.get(
  '/',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
    ENUM_USER_ROLE.VIEWER,
  ),
  BookValueReportController.getAllBookValueReport,
);

router.patch(
  '/:id',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BookValueReportController.updateBookValueReport,
);

router.delete(
  '/:id',
  Authorization(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  BookValueReportController.deleteBookValueReport,
);

router.get(
  '/:id',
  Authorization(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.MAKER,
    ENUM_USER_ROLE.VIEWER,
  ),
  BookValueReportController.getSingleBookValueReport,
);

export const BookValueReportRoutes = router;
