const db = require('../db/db')

module.exports = class Model {
  constructor() {}

  updateReportQuery(table, id) {
    return `UPDATE ${table} SET reported = 1 WHERE id = ${id}`;
  }

  formatDateTimeOfNow() {
    const date = new Date().toISOString().split('T');
    return date[0] + ' ' + date[1].substring(0, 8);
  }

  preparePhotosQueriesArray(table, reference_id, photos) {
    const idKey = table === 'Answers_Photos' ? 'question_id' : 'review_id'
    const photoQueries = []
    photos.forEach(photoUrl => {
      const v = {}
      v[idKey]= reference_id
      v.url = photoUrl
      photoQueries.push(db.query(`INSERT INTO ${table} SET ?`, v))
    })
    return photoQueries;
  }

  updateHelpfulnessQuery(table, id) {
    return `UPDATE ${table} SET helpfulness = helpfulness + 1 WHERE id = ${id}`;
  }

}