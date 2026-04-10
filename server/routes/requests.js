const express = require('express');
const router = express.Router();
const { getRequests, createRequest } = require('../controllers/requestController');
const auth = require('../middleware/auth');

router.get('/', auth, getRequests);
router.post('/', auth, createRequest);

module.exports = router;
