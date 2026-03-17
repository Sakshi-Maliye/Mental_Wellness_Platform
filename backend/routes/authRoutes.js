const express = require('express');
const router = express.Router();

// Ensure these names match the 'exports' names in the controller exactly!
const { register, login, getTherapists } = require('../controllers/authController');

// Line 5 is likely one of these. 
// If register, login, or getTherapists is undefined, it throws the error.
router.post('/register', register);
router.post('/login', login);
router.get('/therapists', getTherapists); 

module.exports = router;