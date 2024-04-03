const express = require('express');
const { sendMessage , getMessage } = require('../controller/message');
const protectRoute = require('../middleware/protectRoute');
const router = express.Router()

router.post('/:id' , protectRoute , getMessage)
router.post('/send/:id' , protectRoute ,sendMessage)

module.exports = router;