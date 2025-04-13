import express from 'express';
import { createBooking, getBookings } from '../controllers/ambulanceController.js';

const router = express.Router();

// Create new booking
router.post('/', createBooking);

// Get all bookings (for admin panel)
router.get('/', getBookings);

export default router;