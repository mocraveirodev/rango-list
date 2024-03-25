import Joi from 'joi';

const restaurantIdSchema = Joi.object({
    restaurantId: Joi.string().guid({ version: 'uuidv1' }).required(),
}).required();

const getPromoSchema = Joi.object().keys({
    description: Joi.string().required(),
    promoPrice: Joi.number().required(),
    startDatetime: Joi.date().required(),
    finishDatetime: Joi.date().required(),
});

const patchPromoSchema = Joi.object().keys({
    description: Joi.string(),
    promoPrice: Joi.number(),
    startDatetime: Joi.date(),
    finishDatetime: Joi.date(),
});

const createProductSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().positive().precision(2).required(),
    category: Joi.string().required(),
    promo: getPromoSchema,
}).required();

const patchProductSchema = Joi.object({
    name: Joi.string(),
    price: Joi.number().positive().precision(2),
    category: Joi.string(),
    promo: patchPromoSchema,
}).required();

const getAllProductsSchema = Joi.object({
    page: Joi.number().min(1),
    perPage: Joi.number().min(1).max(50),
});

const restaurantProductParamsSchema = Joi.object({
    restaurantId: Joi.string().guid({ version: 'uuidv1' }).required(),
    productId: Joi.string().guid({ version: 'uuidv1' }).required(),
});

export {
    createProductSchema,
    restaurantIdSchema,
    getAllProductsSchema,
    restaurantProductParamsSchema,
    patchProductSchema
};
