import Joi from 'joi';

export const updateUserDocsSchema = Joi.object({
    nationalId: Joi.string().trim(),
    maritalStatus: Joi.string().trim(),
    profilePhoto: Joi.string().trim(),
});
