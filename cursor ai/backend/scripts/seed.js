/**
 * Database Seed Script
 * Creates initial test data (doctors and staff users)
 * 
 * Usage: node scripts/seed.js
 * 
 * Note: Make sure MongoDB is running and .env is configured
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Doctor = require('../models/Doctor');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

async function seed() {
  try {
    await connectDB();

    console.log('Starting seed process...');

    // Create Staff User
    const staffEmail = 'staff@example.com';
    const staffPassword = 'staff123';

    let staffUser = await User.findOne({ email: staffEmail });
    if (!staffUser) {
      const hashedPassword = await bcrypt.hash(staffPassword, 10);
      staffUser = new User({
        email: staffEmail,
        password: hashedPassword,
        role: 'staff',
        isActive: true
      });
      await staffUser.save();
      console.log('✓ Staff user created');
      console.log(`  Email: ${staffEmail}`);
      console.log(`  Password: ${staffPassword}`);
    } else {
      console.log('✓ Staff user already exists');
    }

    // Create Doctor Users
    const doctors = [
      {
        email: 'doctor1@example.com',
        password: 'doctor123',
        firstName: 'John',
        lastName: 'Smith',
        specialization: 'Cardiology',
        phone: '+1 234 567 8901',
        availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        availableHours: { start: '09:00', end: '17:00' }
      },
      {
        email: 'doctor2@example.com',
        password: 'doctor123',
        firstName: 'Sarah',
        lastName: 'Johnson',
        specialization: 'Pediatrics',
        phone: '+1 234 567 8902',
        availableDays: ['monday', 'tuesday', 'wednesday', 'thursday'],
        availableHours: { start: '10:00', end: '18:00' }
      },
      {
        email: 'doctor3@example.com',
        password: 'doctor123',
        firstName: 'Michael',
        lastName: 'Brown',
        specialization: 'General Medicine',
        phone: '+1 234 567 8903',
        availableDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        availableHours: { start: '08:00', end: '16:00' }
      }
    ];

    for (const doctorData of doctors) {
      let doctorUser = await User.findOne({ email: doctorData.email });
      
      if (!doctorUser) {
        const hashedPassword = await bcrypt.hash(doctorData.password, 10);
        doctorUser = new User({
          email: doctorData.email,
          password: hashedPassword,
          role: 'doctor',
          isActive: true
        });
        await doctorUser.save();

        const doctor = new Doctor({
          userId: doctorUser._id,
          firstName: doctorData.firstName,
          lastName: doctorData.lastName,
          specialization: doctorData.specialization,
          phone: doctorData.phone,
          email: doctorData.email,
          availableDays: doctorData.availableDays,
          availableHours: doctorData.availableHours,
          isActive: true
        });
        await doctor.save();

        console.log(`✓ Doctor created: Dr. ${doctorData.firstName} ${doctorData.lastName}`);
        console.log(`  Email: ${doctorData.email}`);
        console.log(`  Password: ${doctorData.password}`);
      } else {
        console.log(`✓ Doctor already exists: ${doctorData.email}`);
      }
    }

    console.log('\n✓ Seed process completed!');
    console.log('\nTest Accounts:');
    console.log('Staff:');
    console.log(`  Email: ${staffEmail}`);
    console.log(`  Password: ${staffPassword}`);
    console.log('\nDoctors:');
    doctors.forEach(d => {
      console.log(`  Email: ${d.email}, Password: ${d.password}`);
    });
    console.log('\nYou can now register patients through the registration page or staff dashboard.');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
