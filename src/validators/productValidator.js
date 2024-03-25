import Joi from 'joi';

const restaurantIdSchema = Joi.object({
    restaurantId: Joi.string().guid({ version: 'uuidv1' }).required(),
}).required();

const promoSchema = Joi.object().keys({
    description: Joi.string().required(),
    promoPrice: Joi.number().required(),
    startDatetime: Joi.date().required(),
    finishDatetime: Joi.date().required(),
});

const createProductSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().positive().precision(2).required(),
    category: Joi.string().required(),
    promo: promoSchema,
    }).required();

export {
    createProductSchema,
    restaurantIdSchema,
};
