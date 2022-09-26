const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/connect");
const transactionRouter = require("./routes/transactions");

/* MIDDLEWARES */
app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1", transactionRouter);

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
