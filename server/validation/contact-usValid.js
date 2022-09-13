const Joi = require("joi");


const contactSkeleton = {
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  subject: Joi.string().min(2).max(100).required(),
  message: Joi.string().min(2).max(259).required(),
};

const contactSchema = Joi.object(contactSkeleton);
module.exports = {
  contactSchema,
};
