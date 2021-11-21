const router = require('express').Router();
const ctrl = require('../controllers')

router.get('/questions', ctrl.qa.getQuestionsByProductId)
router.get('/questions/:question_id/answers', ctrl.qa.getAnswersByQuestionId)
router.post('/questions', ctrl.qa.postQuestion)
router.post('/questions/:question_id/answers', ctrl.qa.postAnswer)
router.put('/questions/:question_id/helpful', ctrl.qa.updateQuestionAsHelpful)
router.put('/questions/:question_id/report', ctrl.qa.updateQuestionAsReported)
router.put('/answers/:answer_id/helpful', ctrl.qa.updateAnswerAsHelpful)
router.put('/answers/:answer_id/report', ctrl.qa.updateAnswerAsReported)

module.exports = router;