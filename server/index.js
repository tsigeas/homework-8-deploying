const express = require("express");
const { getKey } = require("./util/key");
const { sendKey } = require("./service/email");
const { index, register, confirm } = require("./views/pages");
const ClientDao = require("./data/ClientDao");

const app = express();
const port = process.env.PORT || 5050;

const clients = new ClientDao();

// You need this to parse submitted form data!
app.use(express.urlencoded({ extended: false }));

app.get("/", (_req, res) => {
  res.send(index());
});

app.get("/api/clients", async (req, res) => {
  // TODO users must not get the clients data unless
  //  they provide a valid API Key

  const data = await clients.readAll();
  return res.status(200).json({
    data,
  });
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
