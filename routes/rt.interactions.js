const router = require('express').Router();
const ctrl = require('../controllers')
router.post('/', ctrl.interactions.postInteractions)

module.exports = router;