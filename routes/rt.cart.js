const router = require('express').Router();
const ctrl = require('../controllers');

router.get('/', ctrl.cart.getUserCart)
router.post('/', ctrl.cart.addToCart)

module.exports = router;