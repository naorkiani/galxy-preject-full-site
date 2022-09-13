const Joi = require("joi");

function validateCard(card) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(256).required(),
    flight: Joi.string().min(2).max(256).required(),
    description: Joi.string().min(2).max(1024).required(),
    addressLaunch: Joi.string().min(2).max(256).required(),
    phone: Joi.string().min(9).max(14).required(),
    url: Joi.string().min(6).max(1024),
    alt: Joi.string().min(2).max(256),
    Flightdate: Joi.date(),
  });
  return schema.validateAsync(card, { abortEarly: false });
}

exports.validateCard = validateCard;
