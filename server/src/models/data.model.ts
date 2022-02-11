import mongoose from "./index";

const Schema = mongoose.Schema;
const dataSchema = new Schema({ data: String });

const Data = mongoose.model("wa5", dataSchema);

export async function getData () {
  const data = await Data.findOne();
  console.log(data);
  return data;
}

export async function postData (body: string) {
  const data = new Data({ data: body });
  data.save(function (error: string) {
    if (error) {
      console.log(error);
      return error;
    }
  });
}