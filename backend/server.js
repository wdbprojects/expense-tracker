const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/connect");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Can I get a hello there");
});

const start = async () => {
  try {
    await connectDB(process.env.CONNECTION_STRING);
    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

start();
