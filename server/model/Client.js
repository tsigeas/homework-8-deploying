// TODO update this and define a Mongoose schema and model!
const mongoose = require("mongoose");
const {v4: uuidv4} = require("uuid");

const ClientSchema = new mongoose.Schema({
    _id: {type: String, default: () => uuidv4()},
    name: {type: String, required: true},
    email: {type: String, required: true},
})

const Client = mongoose.model("Client", ClientSchema);
module.exports = Client;