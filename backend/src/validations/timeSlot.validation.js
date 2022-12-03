const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTimeSlot = {
  body: Joi.object().keys({
    start: Joi.string().required(),
    finish: Joi.string().required(),
  }),
};

const getTimeSlots = {
  query: Joi.object().keys({
    start: Joi.string(),
    finish: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getTimeSlot = {
  params: Joi.object().keys({
    timeSlotId: Joi.string().custom(objectId),
  }),
};

const updateTimeSlot = {
  params: Joi.object().keys({
    timeSlotId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      start: Joi.string().required(),
      finish: Joi.string().required(),
    })
    .min(1),
};

const deleteTimeSlotById = {
  params: Joi.object().keys({
    timeSlotId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTimeSlot,
  getTimeSlots,
  getTimeSlot,
  updateTimeSlot,
  deleteTimeSlotById,
};
