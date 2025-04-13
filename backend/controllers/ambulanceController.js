import AmbulanceBooking from '../models/AmbulanceBooking.js';

// Create new ambulance booking
export const createBooking = async (req, res) => {
  try {
    const booking = new AmbulanceBooking({
      patientName: req.body.patientName,
      contactNumber: req.body.contactNumber,
      location: req.body.location,
      emergencyType: req.body.emergencyType,
      additionalNotes: req.body.additionalNotes,
      bookingType: req.body.bookingType,
      scheduledTime: req.body.bookingType === 'later' ? req.body.scheduledTime : null,
      status: 'pending'
    });

    const savedBooking = await booking.save();
    
    res.status(201).json({
      success: true,
      booking: savedBooking
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all ambulance bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await AmbulanceBooking.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};