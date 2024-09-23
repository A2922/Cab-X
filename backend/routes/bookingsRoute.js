import express from 'express';
import { checkBooking, createBooking, getBookings, deleteBooking, editBooking } from '../controllers/bookingController.js';

const router = express.Router();

// Route for checking booking availability
router.post('/check', checkBooking);

// Route for creating a new booking
router.post('/create', createBooking);

// Route for getting all bookings
router.get('/', getBookings);

// Route for deleting a booking by ID
router.delete('/:id', deleteBooking);

// Route for editing a booking by ID
router.put('/:id', editBooking);

export default router;
