import { Router } from 'express';
import usersRoutes from './users';
import documentsRoutes from './documents';
import authRoutes from './auth';
import authMiddleware from '../middlewares/auth.middleware';

const routes = Router();

const entryPoint = Router();
entryPoint.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to user management',
  });
});

routes.use(entryPoint, authRoutes);

routes.use(authMiddleware.isAuthenticated, usersRoutes, documentsRoutes)

export default routes;
