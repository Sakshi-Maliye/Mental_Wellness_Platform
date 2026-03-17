const express = require('express');
const router = express.Router();

// Ensure these two names match the controller exactly
const { bookAppointment, getTherapistAppointments } = require('../controllers/appointmentController');

// Check that these are actually functions
router.post('/book', bookAppointment);
router.get('/therapist/:id', getTherapistAppointments);

module.exports = router;