const router = require('express').Router();
const ctrl = require('../controllers')

router.get('/', ctrl.reviews.getAllReviewsByProductId)
router.get('/meta', ctrl.reviews.getReviewMetaDataByProductId)
router.post('/', ctrl.reviews.postReview)
router.put('/:review_id/helpful', ctrl.reviews.updateReviewAsHelpful)
router.put('/:review_id/report', ctrl.reviews.updateReviewAsReported)

module.exports = router;