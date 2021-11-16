// TODO update this and define a Mongoose schema and model!

const { v4: uuidv4 } = require("uuid");

class Client {
  constructor(name, email) {
    this._id = uuidv4();
    this.name = name;
    this.email = email;
  }
}

module.exports = Client;