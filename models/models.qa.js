const db = require('../db/db')
const Model = require('./model.js')

module.exports = class QAModel extends Model {
  constructor() {
    super()
  }

  getQsCountByProductId(product_id) {
    const q = `SELECT COUNT(*) FROM Questions WHERE product_id= ${product_id} AND reported = 0`;
    return db.query(q);
  }

  getQsByProductId(product_id, page, count) {
    const q = `
        SELECT JSON_OBJECT(
          'product_id', ${product_id},
          'results', (
            SELECT JSON_ARRAYAGG(
              JSON_OBJECT(
                'question_id', id,
                'question_body', body,
                'question_date', date_written,
                'asker_name', asker_name,
                'question_helpfulness', helpful,
                'reported', reported,
                'answers', (
                  SELECT JSON_OBJECTAGG(id,
                    JSON_OBJECT(
                      'id', id,
                      'body', body,
                      'date', date_written,
                      'answerer_name', answerer_name,
                      'helpfulness', helpful,
                      'photos', (
                        SELECT JSON_ARRAYAGG(
                          url
                        ) FROM Answers_Photos WHERE answer_id = Answers.id
                      )
                    )
                  ) FROM Answers WHERE question_id = NonReportedQs.id AND Answers.reported = 0
                )
              )
            ) FROM (SELECT * FROM Questions WHERE product_id= ${product_id} AND reported = 0 LIMIT ${count} OFFSET ${(page * count) - count}) AS NonReportedQs
          )
        ) AS questions
      `;
    return db.query(q);
  }

  getAnswersByQId(question_id, page, count) {
    const q = `
      SELECT JSON_OBJECT(
        'question', ${question_id},
        'page', ${page},
        'count', ${count},
        'results', (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'answer_id', id,
              'body', Answers.body,
              'date', Answers.date_written,
              'answerer_name', Answers.answerer_name,
              'helpfulness', Answers.helpful,
              'photos', (
                SELECT JSON_ARRAYAGG(
                  JSON_OBJECT(
                    'id', id,
                    'url', url
                  )
                ) FROM Answers_Photos WHERE answer_id = Answers.id
              )
            )
          ) FROM Answers WHERE question_id = ${question_id} AND reported = 0
        )
      ) AS answers;
    `;
    return db.query(q);
  }

  postQuestion({ body, name, email, product_id}) {
    const q = `
      INSERT INTO
      Questions SET ?
    `;
    const v = {
      product_id: product_id,
      body: body,
      date_written: this.formatDateTimeOfNow(),
      asker_name: name,
      asker_email: email,
      reported: 0,
      helpful: 0
    }
    return db.query(q, v);
  }

  postAnswer(question_id, body, name, email) {
    let v1 = {
      question_id: Number(question_id),
      body: body,
      date_written: this.formatDateTimeOfNow(),
      answerer_name: name,
      answerer_email: email,
      reported: 0,
      helpful: 0
    }
    return db.query(`INSERT INTO Answers SET ?`, v1);
  }

  updateQuestionAsHelpful(question_id) {
    return db.query(this.updateHelpfulnessQuery('Questions', question_id))
  }

  reportQuestion(question_id) {
    return db.query(this.updateReportQuery('Questions', question_id))
  }

  updateAnswerAsHelpful(answer_id) {
    return db.query(this.updateHelpfulnessQuery('Answers', answer_id))
  }

  reportAnswer(answer_id) {
    return db.query(this.updateReportQuery('Answers', answer_id))
  }

}