import express from 'express';
import { createBooking, getBookings, getUserAmbulanceBookings } from '../controllers/ambulanceController.js';

import authUser from '../middleware/authUser.js';

const router = express.Router();

// Create new booking
router.post('/', authUser, createBooking);

// Get user specific ambulance bookings
router.get('/user-bookings', authUser, getUserAmbulanceBookings);

// Get all bookings (for admin panel)
router.get('/', getBookings);

export default router;