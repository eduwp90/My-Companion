const jobs = require('../jobs/jobs');

// exports.doSomething1 = async (req, res) => {
//   try {
//     const data = await model.getData();
//     res.status(200);
//     res.send(data);
//   } catch (e) {
//     console.log('e', e);
//     res.sendStatus(500);
//   }
// };

exports.saveRemainder = (req, res) => {
  try {
    console.log(req.body);
    jobs.createReminder(req.body);
    res.status(201);
    res.send(req.body);
  } catch (e) {
    console.log('e', e);
    res.sendStatus(500);
  }
};
