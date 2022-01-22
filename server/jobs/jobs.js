// const { agenda, transporter } = require('../config/config');
// const moment = require('moment');
// require('dotenv').config({ path: '../.env' });

// agenda.define('sendEmailReminder', (job) => {
//   const email = job.attrs.data.email;
//   const petName = job.attrs.data.petName;
//   const reminderName = job.attrs.data.reminderName;
//   const date = moment.unix(job.attrs.data.date).format('LLL');

//   const mailData = {
//     from: process.env.EMAIL, // sender address
//     to: email, // list of receivers
//     subject: `Reminder for ${petName}'s medication/treatment`,
//     text: `Reminder for your pet ${petName}:
//     Your reminder: ${reminderName} at ${date}`,
//   };

//   transporter.sendMail(mailData, function(err, info) {
//     if (err) console.log(err);
//     else console.log(info);
//   });
// });

// exports.createReminder = async (body) => {
//   agenda
//     .create('sendEmailReminder', body)
//     .unique({
//       'data.email': body.email,
//       'data.petName': body.petName,
//       'data.reminderName': body.reminderName,
//       'data.date': body.date,
//     })
//     .schedule(moment.unix(body.date).subtract(1, 'hours'))
//     .save();

//   return;
// };
