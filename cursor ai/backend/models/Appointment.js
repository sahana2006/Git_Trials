const mongoose = require('mongoose');

/**
 * Appointment Schema
 * Stores appointment information and status
 */
const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: [true, 'Patient ID is required']
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: [true, 'Doctor ID is required']
  },
  appointmentDate: {
    type: Date,
    required: [true, 'Appointment date is required']
  },
  appointmentTime: {
    type: String,
    required: [true, 'Appointment time is required']
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'no-show'],
    default: 'scheduled'
  },
  reason: {
    type: String,
    trim: true
  },
  consultationNotes: {
    type: String,
    trim: true
  },
  createdBy: {
    type: String,
    enum: ['patient', 'staff'],
    default: 'patient'
  }
}, {
  timestamps: true
});

// Index for efficient queries
appointmentSchema.index({ appointmentDate: 1, appointmentTime: 1, doctorId: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
