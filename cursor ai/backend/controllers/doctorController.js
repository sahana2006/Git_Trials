const Doctor = require('../models/Doctor');
const { validationResult } = require('express-validator');

/**
 * Get all doctors
 * GET /api/doctors
 */
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ isActive: true })
      .populate('userId', 'email')
      .select('-__v')
      .sort({ specialization: 1, lastName: 1 });

    res.json({
      success: true,
      count: doctors.length,
      doctors
    });
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch doctors',
      error: error.message
    });
  }
};

/**
 * Get single doctor
 * GET /api/doctors/:id
 */
exports.getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id)
      .populate('userId', 'email');

    if (!doctor || !doctor.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.json({
      success: true,
      doctor
    });
  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch doctor',
      error: error.message
    });
  }
};

/**
 * Get available time slots for a doctor on a specific date
 * GET /api/doctors/:id/available-slots
 */
exports.getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor || !doctor.isActive) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Get all appointments for this doctor on this date
    const Appointment = require('../models/Appointment');
    const appointmentDate = new Date(date);
    appointmentDate.setHours(0, 0, 0, 0);
    const nextDay = new Date(appointmentDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const bookedAppointments = await Appointment.find({
      doctorId: doctor._id,
      appointmentDate: { $gte: appointmentDate, $lt: nextDay },
      status: { $in: ['scheduled'] }
    }).select('appointmentTime');

    const bookedTimes = bookedAppointments.map(apt => apt.appointmentTime);

    // Generate available time slots (30-minute intervals)
    const availableSlots = [];
    const [startHour, startMin] = doctor.availableHours.start.split(':').map(Number);
    const [endHour, endMin] = doctor.availableHours.end.split(':').map(Number);

    let currentHour = startHour;
    let currentMin = startMin;

    while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
      const timeString = `${String(currentHour).padStart(2, '0')}:${String(currentMin).padStart(2, '0')}`;
      
      if (!bookedTimes.includes(timeString)) {
        availableSlots.push(timeString);
      }

      currentMin += 30;
      if (currentMin >= 60) {
        currentMin = 0;
        currentHour += 1;
      }
    }

    res.json({
      success: true,
      availableSlots,
      doctorHours: {
        start: doctor.availableHours.start,
        end: doctor.availableHours.end
      }
    });
  } catch (error) {
    console.error('Get available slots error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch available slots',
      error: error.message
    });
  }
};
