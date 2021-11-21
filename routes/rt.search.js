const router = require('express').Router();
const ctrl = require('../controllers')

router.get('/', ctrl.search.getSearchResults)
router.get('/exact', ctrl.search.getIfSearchQueryHasExactResult)

module.exports = router;