import { Router } from 'express';
import StudentController from './app/controllers/StudentController';
import EnrollmentController from './app/controllers/EnrollmentController';

import validateStudentStore from './app/validators/StudentStore';
import validateEnrollmentStore from './app/validators/EnrollmentStore';
import basicAuth from './app/middlewares/basic-auth';

const routes = new Router();

routes.post('/students', validateStudentStore, StudentController.store);
routes.get('/students', StudentController.list);

routes.use((req, res, next) => {
  basicAuth(req, res, next);
});

routes.post(
  '/enrollments',
  validateEnrollmentStore,
  EnrollmentController.store
);

routes.get('/enrollments', EnrollmentController.list);

export default routes;
