require('dotenv').config({ path: '../.env' });
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const Agenda = require('agenda');
const Parse = require('parse/node');
const nodemailer = require('nodemailer');

const mongoConnectionString = process.env.DATABASE_URI;

const ParseInit = function() {
  Parse.initialize(
    process.env.REACT_APP_APP_ID,
    process.env.REACT_APP_JAVASCRIPT_KEY,
    process.env.MASTER_KEY || '123456'
  );
  Parse.serverURL =
    process.env.REACT_APP_SERVER_URL || 'http://localhost:1337/parse';
};

const api = new ParseServer({
  databaseURI: mongoConnectionString,
  appId: process.env.REACT_APP_APP_ID || 'Pet-app',
  masterKey: process.env.MASTER_KEY || '123456',
  serverURL:
    process.env.REACT_APP_SERVER_URL || 'http://localhost:1337/database',
});

const options = { allowInsecureHTTP: false };

const dashboard = new ParseDashboard(
  {
    apps: [
      {
        serverURL:
          process.env.REACT_APP_SERVER_URL || 'http://localhost:1337/database',
        appId: process.env.REACT_APP_APP_ID || 'Pet-app',
        masterKey: process.env.MASTER_KEY || '123456',
        appName: 'Pet App - Solo project',
      },
    ],
    users: [
      {
        user: 'codeworks',
        pass: process.env.DASHBOARD_PASSWORD || '12345678',
      },
    ],
    useEncryptedPasswords: false,
  },
  options
);

const agenda = new Agenda({ db: { address: mongoConnectionString } });

const removeCSP = function(req, res, next) {
  res.removeHeader('Content-Security-Policy');
  next();
};

const transporter = nodemailer.createTransport({
  port: 465, // true for 465, false for other ports
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  secure: true,
});

module.exports = {
  agenda,
  api,
  dashboard,
  removeCSP,
  Parse,
  ParseInit,
  transporter,
};
