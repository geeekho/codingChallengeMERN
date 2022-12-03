const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const timeSlotSchema = mongoose.Schema(
    {
        start: { type: Date, required: true },
        finish: { type: Date, required: true },
        assigned_employees: [
            {
                employeeId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Employee",
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
timeSlotSchema.plugin(toJSON);
timeSlotSchema.plugin(paginate);

/**
 * Check if timeSlot is taken
 * @param {timestamp} start - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
timeSlotSchema.statics.isTimeTaken = async function (start, excludeUserId) {
    const timeSlot = await this.findOne({ start, _id: { $ne: excludeUserId } });
    return !!timeSlot;
};

/**
 * @typedef TimeSlot
 */
const TimeSlot = mongoose.model('TimeSlot', timeSlotSchema);

module.exports = TimeSlot;
