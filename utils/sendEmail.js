const sendgridMail = require('@sendgrid/mail');
require('dotenv').config();

const { API_KEY_SENDGRID } = process.env;
sendgridMail.setApiKey(API_KEY_SENDGRID);

const sendEmail = async (data) => {
	const email = { ...data, from: 'vikttur.job@gmail.com' };
	await sendgridMail.send(email);
	return true;
}

module.exports = { sendEmail };