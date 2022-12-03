const httpStatus = require('http-status');
const { TimeSlot } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a TimeSlot
 * @param {Object} userBody
 * @returns {Promise<TimeSlot>}
 */
const createTimeSlot = async (userBody) => {
  if (await TimeSlot.isTimeTaken(userBody.start)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'TimeSlot already taken');
  }
  return Employee.create(userBody);
};

/**
 * Query for TimeSlots
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryTimeSlots = async (filter, options) => {
  const timeSlots = await TimeSlot.paginate(filter, options);
  return timeSlots;
};

/**
 * Get TimeSlot by id
 * @param {ObjectId} id
 * @returns {Promise<TimeSlot>}
 */
const getTimeSlotById = async (id) => {
  return TimeSlot.findById(id);
};

/**
 * Update timeSlot by id
 * @param {ObjectId} timeSlotId
 * @param {Object} updateBody
 * @returns {Promise<TimeSlot>}
 */
const updateTimeSlotById = async (timeSlotId, updateBody) => {
  const timeSlot = await getTimeSlotById(timeSlotId);
  if (!timeSlot) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Time Slot not found');
  }
  if (updateBody.start && (await TimeSlot.isTimeTaken(updateBody.start, timeSlotId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Time Slot already taken');
  }
  Object.assign(timeSlot, updateBody);
  await timeSlot.save();
  return timeSlot;
};

/**
 * Delete timeSlot by id
 * @param {ObjectId} timeSlotId
 * @returns {Promise<TimeSlot>}
 */
const deleteTimeSlotById = async (timeSlotId) => {
  const timeSlot = await getTimeSlotById(timeSlotId);
  if (!timeSlot) {
    throw new ApiError(httpStatus.NOT_FOUND, 'TimeSlot not found');
  }
  await timeSlot.remove();
  return timeSlot;
};

module.exports = {
  createTimeSlot,
  queryTimeSlots,
  getTimeSlotById,
  updateTimeSlotById,
  deleteTimeSlotById,
};
