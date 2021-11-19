// TODO update this to persist data in MongoDB!

const Client = require("../model/Client");
const ApiError = require("../model/ApiError");

class ClientDao {

  async create({ name, email }) {
    if (name === undefined || name === "") {
      throw new ApiError(400, "Every client must have a none-empty name!");
    }

    if (email === undefined || email === "") {
      throw new ApiError(400, "Every client must have a valid email!");
    }

    const client = await Client.create({name, email});
    return client;
  }

  // clients may not change their email!
  async update(id, { name }) {

    const client = await Client.findByIdAndUpdate(
      id,
      {name},
      {new: true, runValidators:true}
    );

    if (client === null) {
      throw new ApiError(404, "There is no client with the given ID!");
    }

    return client;
  }

  async delete(id) {
    const client = await Client.findByIdAndDelete(id);

    if (client === null) {
      throw new ApiError(404, "There is no client with the given ID!");
    }

    return client;
  }

  // returns an empty array if there is no client with the given ID
  async read(id) {
    const client = await Client.findById(id);
    return client ? client : [];
  }

  // returns an empty array if there is no client in the database
  //  or no client matches the search queries
  async readAll(query = "") {
    if (query !== "") {
      const clients = await Client.find().or([{name: query}, {text: query}]);
      return clients;
    }
    const clients = await Client.find({});
    return clients;
  }
}

module.exports = ClientDao;
