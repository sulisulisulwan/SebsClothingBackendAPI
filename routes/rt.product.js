const router = require('express').Router();
const ctrl = require('../controllers');

router.get('/', ctrl.product.getAllProducts)
router.get('/:product_id', ctrl.product.getProductById)
router.get('/:product_id/styles', ctrl.product.getProductStyles)
router.get('/:product_id/related', ctrl.product.getRelatedProducts)

module.exports = router;