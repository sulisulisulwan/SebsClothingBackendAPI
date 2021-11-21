const { Cart } = require('../models')

const getUserCart = async (req, res) => {
  let cookies = req.cookies;
  try {
    let cart = await Cart.getUserCart(cookies)
    res.status(200).json(cart);
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const addToCart = async (req, res) => {
  try {
    await Cart.addToCart(cookies, req.body)
    res.sendStatus(201)
  } catch(err) {
    console.error(err)
    res.sendStatus(500)
  }
};

module.exports = {
  getUserCart,
  addToCart
};