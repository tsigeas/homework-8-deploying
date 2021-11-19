const { getKey, getId } = require("./util/key");
const { sendKey } = require("./service/email");
const { index, register, confirm } = require("./views/pages");
const ClientDao = require("./data/ClientDao");
const db = require("./data/db");

const express = require("express");
const app = express();
const port = process.env.PORT || 5050;

const clients = new ClientDao();

db.connect();

app.use(express.urlencoded({ extended: false }));

app.get("/", (_req, res) => {
  res.send(index());
});

async function validKey(key){
  try {
    const id = getId(key);
    const client = await clients.read(id);
    if (!client) {
      return false;
    } else {
      return true;
    }
  } catch(err) {
    return false;
  }
 }
 

app.get("/api/clients", async (req, res) => {
  // check that a key is provided
  const {key} = req.query;
  if(!key) {
    res.status(400).json({message: "You must provide an API Key!"});
  } else {
    // check that the key provided is valid
    const isValid = await validKey(key);
    if(isValid) {
      const data = await clients.readAll();
      return res.status(200).json({
        data,
      });
    } else {
      res.status(403).json({message: "Invalid API Key!"});
    }
  }
});

app.get("/register", (_req, res) => {
  res.send(register());
});

app.post("/register", async (req, res) => {
  const { name, email } = req.body;

  try {
    const data = await clients.create({ name, email });
    const key = getKey(data._id);
    sendKey(name, email, key);
    res.send(confirm(name, true));
  } catch (err) {
    res.send(confirm(name, false));
  }
});

app.listen(port, () => {
  console.log(`Express app listening at port: http://localhost:${port}/`);
});
