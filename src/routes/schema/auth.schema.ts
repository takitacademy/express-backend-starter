import Joi from 'joi';

export const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(6)
        .regex(/^(?=.*[a-zA-Z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/)
        .required()
        .messages({
            'string.pattern.base':
                'Password must contain at least one letter, one digit, and one special character',
        }),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const loginVerificationSchema = Joi.object({
    code: Joi.string().required(),
});

export const emailSchema = Joi.object({
    email: Joi.string().email().required().label('Email'),
});

export const resetPasswordSchema = Joi.object({
    password: Joi.string()
        .min(6)
        .regex(
            /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
        )
        .required()
        .label('Password')
        .messages({
            'string.pattern.base':
                'Password must contain at least one letter, one digit, and one special character',
        }),
    confirm_password: Joi.any()
        .equal(Joi.ref('password'))
        .required()
        .label('Confirm password')
        .messages({ 'any.only': '{{#label}} must match with password!' }),
});

