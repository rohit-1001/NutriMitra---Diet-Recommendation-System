const { createEvent, getEvents } = require('../controllers/eventController');
const express = require('express');
const router = express.Router();

router.post('/createEvent', createEvent);

router.get('/getEvents', getEvents);


module.exports = router;