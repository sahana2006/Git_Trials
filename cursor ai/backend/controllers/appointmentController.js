const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const { validationResult } = require('express-validator');

/**
 * Book a new appointment
 * POST /api/appointments
 */
exports.bookAppointment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { doctorId, appointmentDate, appointmentTime, reason } = req.body;

    // Get patient ID from user
    let patientId;
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ userId: req.user._id });
      if (!patient) {
        return res.status(404).json({
          success: false,
          message: 'Patient profile not found'
        });
      }
      patientId = patient._id;
    } else if (req.user.role === 'staff') {
      patientId = req.body.patientId;
      if (!patientId) {
        return res.status(400).json({
          success: false,
          message: 'Patient ID is required for staff'
        });
      }
    }

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor || !doctor.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found or inactive'
      });
    }

    // Check for conflicting appointments
    const existingAppointment = await Appointment.findOne({
      doctorId,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      status: { $in: ['scheduled'] }
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'Time slot already booked'
      });
    }

    // Create appointment
    const appointment = new Appointment({
      patientId,
      doctorId,
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      reason,
      createdBy: req.user.role === 'staff' ? 'staff' : 'patient'
    });

    await appointment.save();

    // Populate patient and doctor details
    await appointment.populate('patientId', 'firstName lastName phone');
    await appointment.populate('doctorId', 'firstName lastName specialization');

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      appointment
    });
  } catch (error) {
    console.error('Book appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to book appointment',
      error: error.message
    });
  }
};

/**
 * Get all appointments (filtered by role)
 * GET /api/appointments
 */
exports.getAppointments = async (req, res) => {
  try {
    let query = {};

    // Filter by role
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ userId: req.user._id });
      if (!patient) {
        return res.status(404).json({
          success: false,
          message: 'Patient profile not found'
        });
      }
      query.patientId = patient._id;
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ userId: req.user._id });
      if (!doctor) {
        return res.status(404).json({
          success: false,
          message: 'Doctor profile not found'
        });
      }
      query.doctorId = doctor._id;
    }

    // Optional filters
    if (req.query.status) {
      query.status = req.query.status;
    }
    if (req.query.date) {
      const date = new Date(req.query.date);
      date.setHours(0, 0, 0, 0);
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      query.appointmentDate = { $gte: date, $lt: nextDay };
    }

    const appointments = await Appointment.find(query)
      .populate('patientId', 'firstName lastName phone dateOfBirth gender')
      .populate('doctorId', 'firstName lastName specialization')
      .sort({ appointmentDate: 1, appointmentTime: 1 });

    res.json({
      success: true,
      count: appointments.length,
      appointments
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments',
      error: error.message
    });
  }
};

/**
 * Get single appointment
 * GET /api/appointments/:id
 */
exports.getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patientId', 'firstName lastName phone dateOfBirth gender address')
      .populate('doctorId', 'firstName lastName specialization phone email');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check authorization
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ userId: req.user._id });
      if (appointment.patientId._id.toString() !== patient._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ userId: req.user._id });
      if (appointment.doctorId._id.toString() !== doctor._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }
    }

    res.json({
      success: true,
      appointment
    });
  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointment',
      error: error.message
    });
  }
};

/**
 * Update appointment status
 * PATCH /api/appointments/:id/status
 */
exports.updateStatus = async (req, res) => {
  try {
    const { status, consultationNotes } = req.body;

    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Authorization check
    if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ userId: req.user._id });
      if (appointment.doctorId.toString() !== doctor._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }
    }

    // Update status
    if (status) {
      appointment.status = status;
    }
    if (consultationNotes !== undefined) {
      appointment.consultationNotes = consultationNotes;
    }

    await appointment.save();

    await appointment.populate('patientId', 'firstName lastName phone');
    await appointment.populate('doctorId', 'firstName lastName specialization');

    res.json({
      success: true,
      message: 'Appointment updated successfully',
      appointment
    });
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update appointment',
      error: error.message
    });
  }
};

/**
 * Cancel appointment
 * PATCH /api/appointments/:id/cancel
 */
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Authorization check
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ userId: req.user._id });
      if (appointment.patientId.toString() !== patient._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }
    }

    if (appointment.status === 'cancelled') {
      return res.status(400).json({
        success: false,
        message: 'Appointment already cancelled'
      });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.json({
      success: true,
      message: 'Appointment cancelled successfully',
      appointment
    });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel appointment',
      error: error.message
    });
  }
};
