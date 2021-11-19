const mongoose = require("mongoose");
 
// TODO replace <3TxrYUs6QsWLrFGN> with the password for quicknote-admin
const URI = `mongodb+srv://data-admin:3TxrYUs6QsWLrFGN@db-hw8.fzi7s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

async function connect() {
 try {
   await mongoose.connect(URI);
   console.log("Connected to MongoDB!");
 } catch (err) {
   console.log(err);
 }
}
module.exports = { connect };
