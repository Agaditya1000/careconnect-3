import express from "express";
import {
  createLabBooking,
  getLabBookings,
  updateLabBookingStatus,
  getAvailableTimeSlots
} from "../controllers/labBookingController.js";

const router = express.Router();

// Create a new lab booking
router.post('/', createLabBooking);

// Get lab bookings (with optional filters)
router.get('/', getLabBookings);

// Get available time slots for a specific date
router.get('/available-slots', getAvailableTimeSlots);

// Update lab booking status
router.patch('/:id/status', updateLabBookingStatus);

export { router as labBookingRouter };