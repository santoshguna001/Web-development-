const nodemailer = require('nodemailer');
let fromMail = 'santoshgunashekar@gmail.com';
let toMail = 'santoshguna001@gmail.com';
let subject = 'An email using nodejs app';
let text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'santoshgunashekar@gmail.com',
        pass: process.env.PASSWORD
    }
});
let mailOptions = {
    from: fromMail,
    to: toMail,
    subject: subject,
    text: text
};
transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
        console.log(error);
    }
    console.log(response)
});