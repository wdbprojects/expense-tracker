const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

router.get("/transaction", async (req, res) => {
  const transaction = await Transaction.find().sort({ createdDate: "desc" });
  res.json(transaction);
});

router.post("/transaction", async (req, res) => {
  const { amount, description, date } = req.body;
  const transaction = new Transaction({
    amount: amount,
    description: description,
    date: date,
  });
  await transaction.save();
  res.json({ message: "Success!!" });
});

module.exports = router;
