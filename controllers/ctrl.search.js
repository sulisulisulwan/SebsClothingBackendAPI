const { SearchModel } = require('../models')

const Search = new SearchModel;
Search.getProductNameAndId
const getSearchResults = async (req, res) => {
  const { search } = req.query
  try {
    let searchResults = await Search.getProductNameAndId(search)
    searchResults = searchResults[0].filter((result, i) => {
      if (i === 0) {
        return true;
      }
      if (result.name === searchResults[0][i - 1].name) {
        return false;
      }
      return true;
    })
    res.status(200).json(searchResults);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getIfSearchQueryHasExactResult = async(req, res) => {
  try {
    let isExact = await Search.getProductByName(req.query.search)
    isExact = !!isExact[0].length
    return res.status(200).json(isExact);
  } catch(err) {
    console.error(err)
  }
}

module.exports = {
  getSearchResults,
  getIfSearchQueryHasExactResult
}