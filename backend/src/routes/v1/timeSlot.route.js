const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/timeslot.validation');
const userController = require('../../controllers/timeslot.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageTimeSlot'), validate(userValidation.createEmployee), userController.createTimeSlot)
  .get(auth('getTimeSlots'), validate(userValidation.getTimeSlots), userController.getTimeSlot);

router
  .route('/:timeSlotId')
  .get(auth('getTimeSlots'), validate(userValidation.getTimeSlot), userController.getTimeSlot)
  .patch(auth('manageTimeSlot'), validate(userValidation.updateTimeSlot), userController.updateTimeSlotById)
  .delete(auth('manageTimeSlot'), validate(userValidation.deleteTimeSlotById), userController.deleteTimeSlotById);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: TimeSlot
 *   description: TimeSlot management
 */

/**
 * @swagger
 * /timeSlots:
 *   post:
 *     summary: Create a TimeSlot
 *     description: Only admins can create TimeSlots.
 *     tags: [TimeSlots]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - start
 *               - finish
 *               - employees
 *             properties:
 *               start:
 *                 type: string
 *                 format: datetime
 *                 description: must be unique
 *               finish:
 *                 type: string
 *                 format: datetime
 *               employees:
 *                  type: array
 *             example:
 *               start: 2020-05-12T22:50:21.817Z
 *               finish: 2020-05-12T23:50:21.817Z
 *               employees: [638b72532db0552954cb0e81, 638b72cc2db0552954cb0f01]
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/TimeSlot'
 *       "400":
 *         $ref: '#/components/responses/DuplicateStart'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all TimeSlots
 *     description: Only admins can retrieve all TimeSlots.
 *     tags: [TimeSlots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *         description: TimeSlot start date
 *       - in: query
 *         name: finish
 *         schema:
 *           type: string
 *         description: TimeSlot finish date
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TimeSlot'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /timeSlots/{id}:
 *   get:
 *     summary: Get a TimeSlot
 *     description: Only admins can fetch TimeSlots.
 *     tags: [TimeSlots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: TimeSlot id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/TimeSlot'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a TimeSlot
 *     description: Only admins can update TimeSlot.
 *     tags: [TimeSlots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: TimeSlot id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start:
 *                 type: string
 *                 description: must be unique
 *               finish:
 *                 type: string
 *             example:
 *              start: 2020-05-12T22:50:21.817Z
 *              finish: 2020-05-12T23:50:21.817Z
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/TimeSlot'
 *       "400":
 *         $ref: '#/components/responses/DuplicateStart'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a TimeSlot
 *     description: Only admins can delete TimeSlot.
 *     tags: [TimeSlots]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: TimeSlot id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
