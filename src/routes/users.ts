import express, { NextFunction, Request, Response } from 'express';
import UserController from '../controllers/user.controller';
import { updateUser, uuidValidator } from './validations/user.validations';

const router = express.Router();

router.get(
  '/users/:id',
  uuidValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const user = await UserController.getById(id);
      return res.json({ user });
    } catch (error) {
      return next(error);
    }
  },
);

router.put(
  '/users/:id',
  uuidValidator,
  updateUser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id as string;
      const response = await UserController.updateUser(id, req.body);
      return res.json(response);
    } catch (error) {
      return next(error);
    }
  },
);

export default router;
