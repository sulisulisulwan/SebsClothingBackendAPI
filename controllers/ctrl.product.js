const { ProductModel } = require('../models');
const Product = new ProductModel;


const getAllProducts = async(req, res) => {
  let { page, count } = req.query
  try {
    let products = await Product.getAll(page, count)
    res.status(200).json(products[0]);
  } catch(err) {
    console.error(err);
    res.sendStatus(500)
  }
}

const getProductById = async(req, res) => {
  let { product_id } = req.params

  try {
    let product = await Product.getOne(product_id)
    res.status(200).json(product[0][0].product);
  } catch(err) {
    console.error(err);
    res.sendStatus(500)
  }
}

const getProductStyles = async(req, res) => {
  let { product_id } = req.params
  try {
    let productStyles = await Product.getStyles(product_id)

    let formatted = productStyles[0][0].Styles;
    formatted.results ?
      formatted.results.forEach(style => style['default?'] = style['default?'] === '1' ? true : false)
      : formatted.results = [];

    res.status(200).json(formatted);
  } catch(err) {
    console.error(err);
    res.sendStatus(500)
  }
}

const getRelatedProducts = async(req, res) => {
  let { product_id } = req.params
  try {
    let relatedProductsIds = await Product.getRelated(product_id)
    if (relatedProductsIds[0][0].related === null) {
      relatedProductsIds[0][0].related = [];
    }
    res.status(200).json(relatedProductsIds[0][0].related);
  } catch(err) {
    console.error(err);
    res.sendStatus(500)
  }
}


module.exports = {
  getAllProducts,
  getProductById,
  getProductStyles,
  getRelatedProducts
}