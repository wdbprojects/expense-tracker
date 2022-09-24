const mongoose = require("mongoose");

const connectDB = (connString) => {
  mongoose.connect(connString);
  console.log("Successfully connected to EXPENSE TRACKER database");
};

module.exports = connectDB;
