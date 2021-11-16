// TODO send email to the client using Nodemailer!

function sendKey(name, email, key) {
  console.log(`${name}!\n\nThis is your API key: ${key}\n\n`,)
}

module.exports = { sendKey };