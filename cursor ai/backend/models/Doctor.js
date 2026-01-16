const mongoose = require('mongoose');

/**
 * Doctor Schema
 * Stores doctor information and specialization
 */
const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  specialization: {
    type: String,
    required: [true, 'Specialization is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true
  },
  consultationFee: {
    type: Number,
    default: 0
  },
  availableDays: {
    type: [String],
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    default: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  },
  availableHours: {
    start: { type: String, default: '09:00' },
    end: { type: String, default: '17:00' }
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Virtual for full name
doctorSchema.virtual('fullName').get(function() {
  return `Dr. ${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model('Doctor', doctorSchema);
