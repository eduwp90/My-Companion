require('dotenv').config({ path: '../.env' });
const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
const Agenda = require('agenda');
const Parse = require('parse/node');

const mongoConnectionString = process.env.DATABASE_URI;

const ParseInit = function () {
  Parse.initialize(process.env.APP_ID, process.env.JAVASCRIPT_KEY,process.env.MASTER_KEY);
  Parse.serverURL = process.env.SERVER_URL || 'http://localhost:1337/parse';
}

const api = new ParseServer({
  databaseURI: mongoConnectionString ,
  appId: process.env.APP_ID || 'Pet-app',
  masterKey: process.env.MASTER_KEY || '' ,
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/database',
});

const options = { allowInsecureHTTP: false };

const dashboard = new ParseDashboard({
  "apps": [
    {
      "serverURL": process.env.SERVER_URL || 'http://localhost:1337/database',
      "appId": process.env.APP_ID || 'Pet-app',
      "masterKey": process.env.MASTER_KEY || '' ,
      "appName": "Pet App - Solo project"
    }
  ],
  "users": [
    {
      "user":"eduwp90",
      "pass":process.env.DASHBOARD_PASSWORD
    }
  ],
  "useEncryptedPasswords": false
}, options);

const agenda = new Agenda({db: {address: mongoConnectionString}});

const removeCSP = function(req, res, next){
  res.removeHeader('Content-Security-Policy');
  next();
}

module.exports = {agenda, api, dashboard, removeCSP, Parse, ParseInit};