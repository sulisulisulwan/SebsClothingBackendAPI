const db = require('../db/db')

module.exports = class SearchModel {
  constructor() {}

  getProductNameAndId(searchQuery) {
    const q = `
      SELECT id, name, category
      FROM Product
      WHERE name LIKE '${searchQuery}%'
      LIMIT 5;
    `;
    return db.query(q);
  }

  getProductByName(searchQuery) {
    const q = `
    SELECT id FROM Product WHERE name = '${searchQuery}';
    `;
    return db.query(q);
  }
}
