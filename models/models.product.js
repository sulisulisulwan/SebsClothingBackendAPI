const db = require('../db/db')

module.exports = class ProductModel {
  constructor() {}

  getAll(page, count) {
    const q = `
    SELECT *
    FROM Product
    WHERE id >= ${count * (page - 1) + 1}
    LIMIT ${count};
    `;
    return db.query(q)
  }

  getOne(product_id) {
    const q = `
      SELECT JSON_OBJECT(
        'id', Product.id,
        'name', Product.name,
        'slogan', Product.slogan,
        'description', Product.description,
        'category', Product.category,
        'default_price', Product.default_price,
        'features', (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'feature', feature,
              'value', value
            )
          ) FROM Features WHERE product_id = ${product_id}
        )
      ) AS product FROM Product WHERE id = ${product_id};
    `;
    return db.query(q);
  }

  getStyles(product_id) {
    const q = `
      SELECT JSON_OBJECT(
        'product_id', ${product_id},
        'results', (
          SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
              'style_id', Styles.id,
              'name', Styles.name,
              'original_price', Styles.original_price,
              'sale_price', Styles.sale_price,
              'default?', Styles.default_style,
              'skus', (
                SELECT JSON_OBJECTAGG(id,
                  JSON_OBJECT(
                    'size', size,
                    'quantity', quantity
                  )
                ) FROM SKUs WHERE styleId = Styles.id
              ),
              'photos', (
                SELECT JSON_ARRAYAGG(
                  JSON_OBJECT(
                    'url', url,
                    'thumbnail_url', thumbnail_url
                  )
                ) FROM Product_Photos WHERE styleId = Styles.id
              )
            )
          ) FROM Styles WHERE productId = ${product_id}
        )
      ) AS Styles
    `;
    return db.query(q);
  }

  getRelated(product_id) {
    let q = `
      SELECT JSON_ARRAYAGG(
        related_product_id
      ) AS related FROM Related WHERE current_product_id = ${product_id}
    `;
    return db.query(q)
  }

}




