var express = require('express');
var router = express.Router();
const actionsController = require('../controllers/actions');

router.post('/', actionsController.getEntry);
router.post('/', actionsController.deleteEntry);
router.get('/', actionsController.getCollection);

module.exports = router;
