// TODO send email to the client using Nodemailer!
const nodemailer = require('nodemailer');
 
function sendKey(name, email, key) {
 console.log(`${name}!\n\nThis is your API key: ${key}\n\n`,);
 
 const transporter = nodemailer.createTransport({
   host: "smtp.mailtrap.io",
   port: 2525,
   auth: {
     user: "8afef8a6d5371c",
     pass: "513f4ed1bc921e"
   }
 });
 
 const emailInfo = {
   from: '"Clients API Support" <support@clients-api.com>',
   to: email,
   subject: 'Your Clients API Key',
   text: `Thanks for registering ${name}!, Your API Key is: ${key} `,
   html: `<b>Thanks for registering ${name}!</b><br></br><b> Your API Key is:</b><br></br><br> ${key} </br>`
 };
 
 transporter.sendMail(emailInfo, (error, info) => { 
  if (error) {
     return console.log(error);
   }
 });
}
 
module.exports = { sendKey };