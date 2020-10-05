const express = require('express');
const router = express.Router();
const disconnectController = require('../controllers/disconnect');

router.get('/', disconnectController.disconnect);

module.exports = router;
