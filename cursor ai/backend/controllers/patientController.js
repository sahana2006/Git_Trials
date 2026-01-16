const Patient = require('../models/Patient');
const User = require('../models/User');
const { validationResult } = require('express-validator');

/**
 * Register walk-in patient (Staff only)
 * POST /api/patients/register
 */
exports.registerPatient = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password, firstName, lastName, dateOfBirth, gender, phone, address } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Create user
    const user = new User({
      email,
      password,
      role: 'patient'
    });
    await user.save();

    // Create patient profile
    const patient = new Patient({
      userId: user._id,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      phone,
      address: address || {}
    });
    await patient.save();

    res.status(201).json({
      success: true,
      message: 'Patient registered successfully',
      patient: {
        id: patient._id,
        userId: user._id,
        firstName: patient.firstName,
        lastName: patient.lastName,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Register patient error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register patient',
      error: error.message
    });
  }
};

/**
 * Get all patients (Staff only)
 * GET /api/patients
 */
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find()
      .populate('userId', 'email')
      .select('-__v')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: patients.length,
      patients
    });
  } catch (error) {
    console.error('Get patients error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch patients',
      error: error.message
    });
  }
};

/**
 * Get single patient
 * GET /api/patients/:id
 */
exports.getPatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate('userId', 'email');

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found'
      });
    }

    res.json({
      success: true,
      patient
    });
  } catch (error) {
    console.error('Get patient error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch patient',
      error: error.message
    });
  }
};

/**
 * Get current patient profile
 * GET /api/patients/me
 */
exports.getMyProfile = async (req, res) => {
  try {
    const patient = await Patient.findOne({ userId: req.user._id })
      .populate('userId', 'email');

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient profile not found'
      });
    }

    res.json({
      success: true,
      patient
    });
  } catch (error) {
    console.error('Get my profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      error: error.message
    });
  }
};
