import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import Parse from "parse/node";
import nodemailer from "nodemailer";
import ParseDashboard from "parse-dashboard";
import { ParseServer } from "parse-server";

export const mongoConnectionString: string = process.env.DATABASE_URI!;

export function ParseInit () {
  Parse.initialize(
    process.env.REACT_APP_APP_ID!,
    process.env.REACT_APP_JAVASCRIPT_KEY,
    process.env.MASTER_KEY || '123456'
  );
  Parse.serverURL =
    process.env.REACT_APP_SERVER_URL || 'http://localhost:1337/parse';
}

export const api = new ParseServer({
  databaseURI: mongoConnectionString,
  appId: process.env.REACT_APP_APP_ID || 'Pet-app',
  masterKey: process.env.MASTER_KEY || '123456',
  serverURL:
    process.env.REACT_APP_SERVER_URL || 'http://localhost:1337/database',
});

const options = { allowInsecureHTTP: false };

export const dashboard = new ParseDashboard(
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

// export const removeCSP = function(req: Request, res: Response, next: NextFunction) {
//   res.removeHeader('Content-Security-Policy');
//   next();
// };

export const transporter = nodemailer.createTransport(
  {
    port: 465, // true for 465, false for other ports
    host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: true,
  }
);

