const model = require('../models/model');

exports.doSomething1 = async (req, res) => {
  try {
    const data = await model.getData();
    res.status(200);
    res.send(data);
  } catch (e) {
    console.log('e', e);
    res.sendStatus(500);
  }
};

exports.doSomething2 = (req, res) => {
  try {
    console.log(req.body)
    model.postData(req.body.data);
    res.status(201);
    res.send();
  } catch (e) {
    console.log('e', e);
    res.sendStatus(500);
  }
};