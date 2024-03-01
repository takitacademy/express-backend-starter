import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { emailSchema, loginSchema, loginVerificationSchema, resetPasswordSchema, signupSchema } from '../schema/auth.schema';

export const validator =
    (res: Response, next: NextFunction) =>
        (schema: Joi.ObjectSchema, payload: Record<string, unknown>) => {
            const { error } = schema.validate(payload);
            if (error) {
                const errorMessages: string[] = error.details.map((detail) =>
                    detail.message.replace(/['"]+/g, ''),
                );
                return res.status(400).json({ error: errorMessages[0] });
            }
            return next();
        };


export const signupValidator = (req: Request, res: Response, next: NextFunction) =>
    validator(res, next)(signupSchema, req.body);

export const loginValidator = (req: Request, res: Response, next: NextFunction) =>
    validator(res, next)(loginSchema, req.body);

export const verifyLoginValidator = (req: Request, res: Response, next: NextFunction) =>
    validator(res, next)(loginVerificationSchema, req.body);

export const LoginLinkValidator = (req: Request, res: Response, next: NextFunction) =>
    validator(res, next)(loginVerificationSchema, req.params);

export const emailValidator = (req: Request, res: Response, next: NextFunction) =>
    validator(res, next)(emailSchema, req.body);

export const resetPasswordValidator = (req: Request, res: Response, next: NextFunction) =>
    validator(res, next)(resetPasswordSchema, req.body);

