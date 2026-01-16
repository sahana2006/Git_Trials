const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const patientController = require('../controllers/patientController');
const { authenticate, authorize } = require('../middlewares/auth');

/**
 * Patient Routes
 */

// Register walk-in patient (Staff only)
router.post('/register',
  authenticate,
  authorize('staff'),
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('dateOfBirth').isISO8601().withMessage('Valid date of birth is required'),
    body('gender').isIn(['male', 'female', 'other']).withMessage('Valid gender is required'),
    body('phone').notEmpty().withMessage('Phone number is required')
  ],
  patientController.registerPatient
);

// Get all patients (Staff only)
router.get('/',
  authenticate,
  authorize('staff'),
  patientController.getAllPatients
);

// Get single patient
router.get('/:id',
  authenticate,
  authorize('staff', 'doctor'),
  patientController.getPatient
);

// Get current patient profile
router.get('/me',
  authenticate,
  authorize('patient'),
  patientController.getMyProfile
);

module.exports = router;
