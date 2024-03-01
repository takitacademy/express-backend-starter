import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../helpers';
import userService from '../services/user.service';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization?.split(' ')[1]) {
      return res.status(401).json({ error: 'Token not provided' });
    }
    const tokenData = (await verifyToken(
      authorization?.split(' ')[1],
    )) as { id: string };
    const user = await userService.getById(tokenData.id);
    if (!user) return res.status(400).json({ error: 'Invalid Token' });
    req.user = user;
    return next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default { isAuthenticated };
