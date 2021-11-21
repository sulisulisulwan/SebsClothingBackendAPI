const { Interactions } = require('../models')

const postInteractions =async (req, res) => {

  let { element, widget, time } = req.body

  //validate parameters
  //if parameters invalid
    //throw '422'
  try {
    await Interactions.post(element, widget, time)
    res.sendStatus(201)

  } catch(err) {
    console.error(err)
    //if err is '422'
      //res.sendStatus(422)
    //else
    res.sendStatus(500);
  }
};

module.exports = {
  postInteractions
}