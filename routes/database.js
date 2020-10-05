const express = require('express');
const router = express.Router();
const databaseController = require('../controllers/database');

router.get('/', databaseController.display);
router.post('/', databaseController.create);

module.exports = router;
