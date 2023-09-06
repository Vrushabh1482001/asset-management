const Joi = require("joi");

module.exports.validation = {
  AddUser: Joi.object().keys({
    userName: Joi.string()
      .min(3)
      .replace(/\s+/g, " ")
      .required()
      .trim()
      .messages({
        "string.empty": "{{#label}} is not allowed to be empty.. !!",
      }),
    mobile: Joi.string()
      .trim()
      .regex(/^[0-9]{10}$/)
      .messages({
        "any.required": "{{#label}} is required!!",
        "string.length": "{{#label}} length must be 10 characters long",
        "string.pattern.base":
          "Invalid {{#label}} number. Only numbers are allowed.",
      }),
  }),

  AddVendor: Joi.object().keys({
    vendorName: Joi.string()
      .min(3)
      .replace(/\s+/g, " ")
      .required()
      .trim()
      .messages({
        "string.empty": "{{#label}} is not allowed to be empty.. !!",
      }),
    mobile: Joi.string()
      .trim()
      .regex(/^[0-9]{10}$/)
      .messages({
        "any.required": "{{#label}} is required!!",
        "string.length": "{{#label}} length must be 10 characters long",
        "string.pattern.base":
          "Invalid {{#label}} number. Only numbers are allowed.",
      }),
  }),

  AddCompany: Joi.object().keys({
    companyName: Joi.string()
      .min(3)
      .replace(/\s+/g, " ")
      .required()
      .trim()
      .messages({
        "string.empty": "{{#label}} is not allowed to be empty.. !!",
      }),
    companyMoNo: Joi.string()
      .trim()
      .regex(/^[0-9]{10}$/)
      .messages({
        "any.required": "{{#label}} is required!!",
        "string.length": "{{#label}} length must be 10 characters long",
        "string.pattern.base":
          "Invalid {{#label}} number. Only numbers are allowed.",
      }),
  }),

  AddItem: Joi.object().keys({
    itemName: Joi.string()
      .min(3)
      .replace(/\s+/g, " ")
      .required()
      .trim()
      .messages({
        "string.empty": "{{#label}} is not allowed to be empty.. !!",
      }),
  }),

  AddOrder: Joi.object().keys({
    vendorId: Joi.string().required(),
    itemId: Joi.string().required(),
    companyId: Joi.string().required(),
    quantity: Joi.number().required(),
    user: Joi.string().required(),
  }),
};
