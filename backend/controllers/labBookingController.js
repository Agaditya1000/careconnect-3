import LabBooking from "../models/LabBooking.js";

export const createLabBooking = async (req, res) => {
  try {
    const { name, phone, email, testType, date, time, notes } = req.body;

    // Check for existing booking at the same date and time
    const existingBooking = await LabBooking.findOne({ 
      date: new Date(date),
      time,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'The selected time slot is already booked. Please choose another time.'
      });
    }

    const labBooking = new LabBooking({
      name,
      phone,
      email,
      testType,
      date: new Date(date),
      time,
      notes,
      status: 'pending'
    });

    await labBooking.save();

    res.status(201).json({
      success: true,
      message: 'Lab booking created successfully',
      data: labBooking
    });
  } catch (error) {
    console.error('Error creating lab booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create lab booking',
      error: error.message
    });
  }
};

export const getLabBookings = async (req, res) => {
  try {
    const { email, date, status } = req.query;
    const query = {};
    
    if (email) query.email = email;
    if (date) query.date = new Date(date);
    if (status) query.status = status;

    const labBookings = await LabBooking.find(query).sort({ date: 1, time: 1 });
    
    res.status(200).json({
      success: true,
      count: labBookings.length,
      data: labBookings
    });
  } catch (error) {
    console.error('Error fetching lab bookings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch lab bookings',
      error: error.message
    });
  }
};

export const updateLabBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const labBooking = await LabBooking.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!labBooking) {
      return res.status(404).json({
        success: false,
        message: 'Lab booking not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lab booking status updated',
      data: labBooking
    });
  } catch (error) {
    console.error('Error updating lab booking:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update lab booking',
      error: error.message
    });
  }
};

export const getAvailableTimeSlots = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date parameter is required'
      });
    }

    const bookedSlots = await LabBooking.find({
      date: new Date(date),
      status: { $in: ['pending', 'confirmed'] }
    }).select('time -_id');

    const allSlots = [
      '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
      '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
      '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
    ];

    const bookedTimes = bookedSlots.map(slot => slot.time);
    const availableSlots = allSlots.filter(slot => !bookedTimes.includes(slot));

    res.status(200).json({
      success: true,
      data: availableSlots
    });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch available time slots',
      error: error.message
    });
  }
};