const express = require('express');
const router = express.Router();

// 1. Verify this path is correct
// 2. Verify the names in { } match the controller exactly
const { sendMessage, getChatHistory } = require('../controllers/chatController');

// If sendMessage is undefined here, Express throws that TypeError
router.post('/send', sendMessage); 
router.get('/history/:userId', getChatHistory); 

module.exports = router;