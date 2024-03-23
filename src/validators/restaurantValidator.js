import Joi from 'joi';
import dotenv from 'dotenv';
dotenv.config();

const VALID_HOUR = process.env.REGEX_VALID_HOUR;

const addressSchema = Joi.object({
    postalCode: Joi.string().required(),
    street: Joi.string().required(),
    number: Joi.string().required(),
    complement: Joi.string(),
    neighborhood: Joi.string(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    country: Joi.string().required(),
}).required();

const weekDayOpeningSchema = Joi.object({
    open: Joi.string()
        .regex(VALID_HOUR)
        .required(),
    close: Joi.string()
        .regex(VALID_HOUR)
        .required(),
});

const createRestaurantSchema = Joi.object({
    name: Joi.string().required(),
    address: addressSchema,
    openingHours: Joi.object().keys({
        sunday: weekDayOpeningSchema,
        monday: weekDayOpeningSchema,
        tuesday: weekDayOpeningSchema,
        wednesday: weekDayOpeningSchema,
        thursday: weekDayOpeningSchema,
        friday: weekDayOpeningSchema,
        saturday: weekDayOpeningSchema,
    }).required(),
});

module.exports = {
    createRestaurantSchema
};
