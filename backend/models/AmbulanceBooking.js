import mongoose from 'mongoose';

const ambulanceBookingSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: [true, 'Patient name is required']
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required']
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  emergencyType: {
    type: String,
    required: [true, 'Emergency type is required'],
    enum: ['general', 'accident', 'heart', 'pregnancy', 'burn', 'other']
  },
  additionalNotes: String,
  bookingType: {
    type: String,
    required: [true, 'Booking type is required'],
    enum: ['now', 'later']
  },
  scheduledTime: Date,
  status: {
    type: String,
    enum: ['pending', 'dispatched', 'completed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

export default mongoose.model('AmbulanceBooking', ambulanceBookingSchema);