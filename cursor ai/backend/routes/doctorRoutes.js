const express = require('express');
const router = express.Router();
const { query } = require('express-validator');
const doctorController = require('../controllers/doctorController');
const { authenticate } = require('../middlewares/auth');

/**
 * Doctor Routes
 * Public routes for viewing doctors (authentication optional)
 */

// Get all doctors
router.get('/',
  doctorController.getAllDoctors
);

// Get single doctor
router.get('/:id',
  doctorController.getDoctor
);

// Get available time slots
router.get('/:id/available-slots',
  [
    query('date').isISO8601().withMessage('Valid date is required')
  ],
  doctorController.getAvailableSlots
);

module.exports = router;
