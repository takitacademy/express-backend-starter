import { changePasswordSchema, updateUserSchema } from '../schema/user.schema';
import { validator } from './auth.validations'
import { validate as uuidValidate } from 'uuid';
import { Request, Response, NextFunction } from 'express';
import CustomError from '../../helpers/CustomError';

export const changePasswordValidator = (req: Request, res: Response, next: NextFunction) =>
    validator(res, next)(changePasswordSchema, req.body);

export const uuidValidator = (req: Request, res: Response, next: NextFunction) => {
    const isValid: Boolean = uuidValidate(req.params.id as unknown as string ?? req.body.id as unknown as string);
    if (!isValid) {
        throw new CustomError("Invalid UUID", 400);
    }
    return next();
};

export const updateUser = (req: Request, res: Response, next: NextFunction) =>
    validator(res, next)(updateUserSchema, req.body);
