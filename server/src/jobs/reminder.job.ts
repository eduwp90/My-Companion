import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import moment from "moment";
import { Agenda } from "agenda/es";
import { Job } from "agenda";
import { transporter, mongoConnectionString } from "../config/config";

export const agenda = new Agenda({ 
  db: { address: mongoConnectionString } 
});

agenda.define("sendEmailReminder", (job: Job) => {
  
  const email = job.attrs.data!.email;
  const petName = job.attrs.data!.petName;
  const reminderName = job.attrs.data!.reminderName;
  const date = moment.unix(job.attrs.data!.date).format("LLL");


  const mailData = {
    from: process.env.EMAIL, // sender address
    to: email, // list of receivers
    subject: `Reminder for ${petName}'s medication/treatment`,
    text: `Reminder for your pet ${petName}:
    Your reminder: ${reminderName} at ${date}`,
  };

  transporter.sendMail(mailData, function(error, info) {
    if (error) console.log(error);
    else console.log(info);
  });

});

export async function createReminder (body: any) {
  console.log(body);
  try {
    agenda
      .create('sendEmailReminder', body)
      .unique({
        'data.email': body.email,
        'data.petName': body.petName,
        'data.reminderName': body.reminderName,
        'data.date': body.date,
      })
      .schedule(moment.unix(body.date).subtract(1, 'hours'))
      .save();
  } catch (error) {
    console.log(error, "error in reminder.job")
  }
  return;
}