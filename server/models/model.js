const mongoose = require('./');

const Schema = mongoose.Schema;

const dataSchema = new Schema({
  data: String,
});

const Data = mongoose.model('wa5', dataSchema);


exports.getData = async () => {
  const data = await Data.findOne();
  console.log(data);
  return data;
}

exports.postData = async (body) => {
  const data = new Data({ data: body });
  data.save(function (err) {
    if (err) {
      console.log(err);
      return err;
    }

  });
}