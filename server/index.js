const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require("helmet");
const Agendash = require("agendash");
require('dotenv').config();

const router = require('./router.js');
const { agenda, api, dashboard, removeCSP, ParseInit } = require("./config/config.js");

ParseInit();

const PORT = process.env.PORT || 1337;
const serverUrl = process.env.SERVER_URL;

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/agendash',removeCSP, Agendash(agenda));

// Serve the Parse API on the /parse URL prefix
app.use('/database', api);
app.use('/dashboard',removeCSP,dashboard);

app.use(router);

app.listen(PORT, () => {
  console.log(`Database listening on ${serverUrl}`);
  console.log(`Dashboard running on ${serverUrl.replace('/database','')}/dashboard`);
  console.log(`Agendash running on ${serverUrl.replace('/database','')}/agendash`);
});