// import express from "express";
const express = require("express");
// import cors from "cors";
const cors = require("cors");
// import Agendash from "agendash";
const Agendash = require("agendash");
require('dotenv').config();
// import { 
//   agenda,
//   api,
//   dashboard,
//   removeCSP,
//   ParseInit
// } from "../config/config";
const { 
  agenda,
  api,
  dashboard,
  removeCSP,
  ParseInit
} = require("../config/config");
// import router from "../router";
const router = require("../router");

const app = express();
const PORT = process.env.PORT || 1337;
const serverUrl = process.env.REACT_APP_SERVER_URL || "http://localhost:1337/database";

ParseInit();

app
  .use(cors())
  .use(express.json())
  .use("/agendash", removeCSP, Agendash(agenda))
  .use("/database", api)
  .use("/dashboard", removeCSP, dashboard)
  .use(router);

agenda
  .on("ready", () => {
    agenda.start();
  });

app
  .listen(PORT, () => {
    console.log(`Database listening on ${serverUrl}`);
    console.log(
      `Dashboard running on ${serverUrl.replace('/database', '')}/dashboard`
    );
    console.log(
      `Agendash running on ${serverUrl.replace('/database', '')}/agendash`
    );
  });