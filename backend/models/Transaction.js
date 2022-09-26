const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new Schema({
  amount: Number,
  description: String,
  date: { type: Date, default: new Date() },
  createdDate: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
