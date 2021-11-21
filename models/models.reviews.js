const db = require('../db/db');
const Model = require('./model.js');

module.exports = class ReviewsModel extends Model {
  constructor() {
    super()
  }

  getAll(page, count, sort, product_id) {
    //NEED TO FIX NULL ON EMPTY ARRAY TO BE AN EMPTY ARRAY
    const q = `
      SELECT JSON_OBJECT(
        'product', ${product_id},
        'page', ${page},
        'count', ${count},
        'results', (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'review_id', ID,
              'rating', rating,
              'summary', summary,
              'recommend', recommend,
              'response', response,
              'body', body,
              'date', date,
              'reviewer_name', reviewer_name,
              'helpfulness', helpfulness,
              'photos', (
                SELECT JSON_ARRAYAGG(
                  JSON_OBJECT(
                  'id', ID,
                  'url', url
                  )
                ) FROM Review_Photos WHERE review_id = paginatedReviews.ID
              )
            )
          ) FROM (SELECT * FROM Reviews WHERE product_id = ${product_id} LIMIT ${count} OFFSET ${(page * count) - count}) AS paginatedReviews
        )
      ) AS reviews
    `;
    return db.query(q);
  }

  getRatingsByProductId(product_id) {
    return db.query(`SELECT rating, COUNT(1) count FROM Reviews WHERE product_id = ${product_id} GROUP BY rating`);
  }

  getRecommendationsByProductId(product_id) {
    return db.query(`SELECT recommend, COUNT(1) count FROM Reviews WHERE product_id = ${product_id} GROUP BY recommend`);
  }

  getCharacteristicsByProductId(product_id) {
    return db.query(`
    SELECT name, characteristic_id, FORMAT(AVG(value), 4) value
    FROM Characteristics C
      INNER JOIN
        Characteristic_Reviews CR
        ON C.id = CR.characteristic_id
        WHERE product_id = ${product_id}
        GROUP BY characteristic_id;
    `);
  }

  post(
    product_id, rating, summary, body,
      recommend, name, email,
      characteristics) {
    const v = {
      product_id: product_id,
      rating: rating,
      date: this.formatDateTimeOfNow(),
      summary: summary,
      body: body,
      recommend: recommend,
      reviewer_name: name,
      reviewer_email: email,
      reported: 0,
      helpfulness: 0,
    }
    return db.query(`INSERT INTO Reviews SET ?`, v)
  }

  updateOneAsHelpful(review_id) {
    return db.query(this.updateHelpfulnessQuery('Reviews', review_id))
  }

  updateOneAsReported(review_id) {
    return db.query(this.updateReportQuery('Reviews', review_id))
  }

}