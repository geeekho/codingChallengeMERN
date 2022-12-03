const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { timeSlotService } = require('../services');

const createTimeSlot = catchAsync(async (req, res) => {
  const timeSlot = await timeSlotService.createTimeSlot(req.body);
  res.status(httpStatus.CREATED).send(timeSlot);
});

const getTimeSlots = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['start', 'finish', 'employees']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await timeSlotService.queryTimeSlots(filter, options);
  res.send(result);
});

const getTimeSlot = catchAsync(async (req, res) => {
  const timeSlot = await timeSlotService.getTimeSlotById(req.params.timeSlotId);
  if (!timeSlot) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Time Slot not found');
  }
  res.send(timeSlot);
});

const updateTimeSlotById = catchAsync(async (req, res) => {
  const timeSlot = await timeSlotService.updateTimeSlotById(req.params.timeSlotId, req.body);
  res.send(timeSlot);
});

const deleteTimeSlotById = catchAsync(async (req, res) => {
  await timeSlotService.deleteTimeSlotById(req.params.timeSlotId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createTimeSlot,
  getTimeSlots,
  getTimeSlot,
  updateTimeSlotById,
  deleteTimeSlotById,
};
