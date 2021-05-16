import BaseJoi from 'joi';
import DateExtension from 'joi-date-extensions';
const Joi = BaseJoi.extend(DateExtension);

export var validateBody = (schema) => {
    return (req, res, next) => {
        const result = req.method != 'GET' ? Joi.validate(req.body, schema) : Joi.validate(req.query, schema);
        if (result.error) {
            return res.status(400).json(result.error);
        }
        if (!req.value) { req.value = {}; }
        req.value['body'] = result.value;
        next();
    }
}

export var schemas = {
    loginSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    registerSchema: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().optional().allow(null).empty(''),
        phone: Joi.number().optional().allow(null).empty(''),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }),
    likedSchema: Joi.object().keys({
        isLike: Joi.boolean().required(),
        productId: Joi.string().required(),
    })
}