const { agenda, transporter } = require('../config/config');
const moment = require('moment');
require('dotenv').config({ path: '../.env' });

agenda.define('sendEmailReminder', (job) => {
  const email = job.attrs.data.email;
  console.log('🚀 ~ file: jobs.js ~ line 10 ~ agenda.define ~ email', email);
  const petName = job.attrs.data.petName;
  console.log(
    '🚀 ~ file: jobs.js ~ line 12 ~ agenda.define ~ petName',
    petName
  );
  const reminderName = job.attrs.data.reminderName;
  console.log(
    '🚀 ~ file: jobs.js ~ line 14 ~ agenda.define ~ reminderName',
    reminderName
  );
});

exports.createReminder = async (body) => {
  agenda
    .create('sendEmailReminder', body)
    .unique({
      'data.email': body.email,
      'data.petName': body.petName,
      'data.reminderName': body.reminderName,
      'data.date': body.date,
    })
    .schedule(moment.unix(body.date))
    .save();
  sendEmail();
  return;
};

function sendEmail() {
  const mailData = {
    from: process.env.EMAIL, // sender address
    to: 'eduwp90@gmail.com', // list of receivers
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
  };

  transporter.sendMail(mailData, function(err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}
