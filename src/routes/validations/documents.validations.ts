import { validator } from './auth.validations'
import { Request, Response, NextFunction } from 'express';
import { updateUserDocsSchema } from '../schema/documents.schema';

export const updateUserDocs = (req: Request, res: Response, next: NextFunction) =>
    validator(res, next)(updateUserDocsSchema, req.body);

export const createDocValidator = (req: Request, res: Response, next: NextFunction) =>
    validator(res, next)(updateUserDocsSchema, req.body);
