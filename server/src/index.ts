import dotenv from "dotenv";
dotenv.config();
import express, { Application } from "express";
import cors from "cors";
import Agendash from "agendash";
import { agenda } from "./jobs/reminder.job";
import { 
  api,
  dashboard,
  //removeCSP,
  ParseInit
} from "./config/config";
import router from "./router";
const app:Application = express();
const PORT = process.env.PORT || 1337;
const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:1337/database";

ParseInit();

app
  .use(cors())
  .use(express.json())
  .use("/agendash", /*removeCSP,*/ Agendash(agenda))
  .use("/database", api)
  .use("/dashboard", /*removeCSP,*/ dashboard)
  .use(router);

agenda
  .on("ready", () => {
    agenda.start();
  });

app
  .listen(PORT, ():void => {
    console.log(`Database listening on ${serverUrl}`);
    console.log(
      `Dashboard running on ${serverUrl.replace('/database', '')}/dashboard`
    );
    console.log(
      `Agendash running on ${serverUrl.replace('/database', '')}/agendash`
    );
  });

  export default app;