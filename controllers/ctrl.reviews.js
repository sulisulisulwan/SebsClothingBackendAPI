const { ReviewsModel } = require('../models')
const Reviews = new ReviewsModel;


const getAllReviewsByProductId = async (req, res) => {
  let { page, count, sort, product_id } = req.query
  //sort isn't being used.  should it be done on the client side?
  try {
    let reviews = await Reviews.getAll(page, count, sort, product_id)
    res.status(200).json(reviews[0][0])
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getReviewMetaDataByProductId = async (req, res) => {
  let { product_id } = req.query;
  try {
    let ratings = await Reviews.getRatingsByProductId(product_id)
    let recommend = await Reviews.getRecommendationsByProductId(product_id)
    let characteristics = await Reviews.getCharacteristicsByProductId(product_id)
    let formattedMetaData = {
      product_id: product_id
    }
    let metaData = [ratings, recommend, characteristics]
    metaData.forEach((data, i) => {
      if (i === 0) {
        formattedMetaData.ratings = {}
        data[0].forEach(datum => {
          formattedMetaData.ratings[datum.rating] = datum.count;
        })
      } else if (i === 1) {
        formattedMetaData.recommended = {}
        data[0].forEach(datum => {
          formattedMetaData.recommended[datum.recommend] = datum.count;
        })
      } else {
        formattedMetaData.characteristics = {}
        data[0].forEach(datum => {
          formattedMetaData.characteristics[datum.name] = {}
          formattedMetaData.characteristics[datum.name].value = datum.value
          formattedMetaData.characteristics[datum.name].id = datum.characteristic_id
        })
      }
    });
    res.status(200).json(formattedMetaData);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const postReview = async (req, res) => {
  const { product_id, rating, summary, body,
    recommend, name, email,
    characteristics, photos } = req.body
  try {
    const results = await Reviews.post(
      product_id, rating, summary, body,
      recommend, name, email,
      characteristics)
    const review_id = results[0].insertId
    await Reviews.preparePhotosQueriesArray('Review_Photos', review_id, photos)
    res.sendStatus(201)
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const updateReviewAsHelpful = async (req, res) => {
  const review_id = req.params.review_id
  try {
    await Reviews.updateOneAsHelpful(review_id)
    res.sendStatus(204)
  } catch(err) {
    res.sendStatus(500);
    console.error(err);
  }
};

const updateReviewAsReported = async (req, res) => {
  let review_id = req.params.review_id
  try {
    await Reviews.updateOneAsReported(review_id)
    res.sendStatus(204)
  } catch(err) {
    console.error(err);
    res.sendStatus(500);
  }
};

module.exports = {
  getAllReviewsByProductId,
  getReviewMetaDataByProductId,
  postReview,
  updateReviewAsHelpful,
  updateReviewAsReported
}