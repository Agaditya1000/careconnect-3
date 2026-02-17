import express from "express";
import {
  createLabBooking,
  getLabBookings,
  updateLabBookingStatus,
  getUserLabBookings,
  getAvailableTimeSlots
} from "../controllers/labBookingController.js";

import authUser from "../middleware/authUser.js";

const router = express.Router();

// Create a new lab booking
router.post('/', authUser, createLabBooking);

// Get lab bookings (with optional filters)
router.get('/', getLabBookings);

// Get user lab bookings
router.get('/user-bookings', authUser, getUserLabBookings);

// Get available time slots for a specific date
router.get('/available-slots', getAvailableTimeSlots);

// Update lab booking status
router.patch('/:id/status', updateLabBookingStatus);

export { router as labBookingRouter };