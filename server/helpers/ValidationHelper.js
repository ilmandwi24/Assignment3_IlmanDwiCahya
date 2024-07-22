const Joi = require('joi');
const Boom = require('boom');

const searchAnimeValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const phoneBookValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    number: Joi.string().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
};

const laptopValidation = (data) => {
  const schema = Joi.object({
    nama: Joi.string().required(),
    brand:Joi.string().required(),
    processor:Joi.string().required(),
    ram:Joi.number().integer().required(),
    vga :Joi.string().required(),
    harga :Joi.number().integer().required()
  });

  if (schema.validate(data).error) {
    throw Boom.badRequest(schema.validate(data).error);
  }
}

module.exports = { searchAnimeValidation, phoneBookValidation,laptopValidation };
