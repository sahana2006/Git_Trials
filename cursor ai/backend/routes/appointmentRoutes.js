const express = require('express');
const router = express.Router();
const { body, query } = require('express-validator');
const appointmentController = require('../controllers/appointmentController');
const { authenticate, authorize } = require('../middlewares/auth');

/**
 * Appointment Routes
 * All routes require authentication
 */

// Book appointment
router.post('/',
  authenticate,
  authorize('patient', 'staff'),
  [
    body('doctorId').notEmpty().withMessage('Doctor ID is required'),
    body('appointmentDate').isISO8601().withMessage('Valid appointment date is required'),
    body('appointmentTime').notEmpty().withMessage('Appointment time is required'),
    body('reason').optional().trim()
  ],
  appointmentController.bookAppointment
);

// Get all appointments (filtered by role)
router.get('/',
  authenticate,
  [
    query('status').optional().isIn(['scheduled', 'completed', 'cancelled', 'no-show']),
    query('date').optional().isISO8601()
  ],
  appointmentController.getAppointments
);

// Get single appointment
router.get('/:id', authenticate, appointmentController.getAppointment);

// Update appointment status
router.patch('/:id/status',
  authenticate,
  authorize('doctor', 'staff'),
  [
    body('status').optional().isIn(['scheduled', 'completed', 'cancelled', 'no-show']),
    body('consultationNotes').optional().trim()
  ],
  appointmentController.updateStatus
);

// Cancel appointment
router.patch('/:id/cancel',
  authenticate,
  authorize('patient', 'staff'),
  appointmentController.cancelAppointment
);

module.exports = router;
