import Joi from 'joi';
import { countries } from '../../constants';

export const changePasswordSchema = Joi.object({
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
        .messages({ 'any.only': '{{#label}} must match with password!' })

});

export const updateUserSchema = Joi.object({
    firstName: Joi.string().trim(),
    lastName: Joi.string().trim(),
    governmentID: Joi.string().trim(),
    profilePhoto: Joi.string().trim(),
    dateOfBirth: Joi.date(),
    gender: Joi.string().valid("Male", "Female"),
    maritalStatus: Joi.string().valid("single", "married", "divorced", "widowed").trim(),
    nationality: Joi.string().valid(...countries).trim()
});
