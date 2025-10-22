import Transaction from "../models/transaction.model.js";

// GET all transactions
export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    return res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({ message: "Server error while fetching transactions." });
  }
};

// POST a new transaction
export const createTransaction = async (req, res) => {
  try {
    const { type, category, amount, date, description } = req.body;

    if (!type || !category || !amount || !date) {
      return res.status(400).json({ message: "Type, category, amount, and date are required." });
    }

    const transaction = new Transaction({
      type,
      category,
      amount,
      date,
      description: description || "",
    });

    const savedTransaction = await transaction.save();
    return res.status(201).json(savedTransaction);
  } catch (error) {
    console.error("Error creating transaction:", error);
    return res.status(500).json({ message: "Server error while creating transaction." });
  }
};

// DELETE a transaction by ID
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Transaction.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Transaction not found." });
    }

    return res.status(200).json({ message: "Transaction deleted successfully." });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return res.status(500).json({ message: "Server error while deleting transaction." });
  }
};

export const getTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    return res.status(200).json(transactions); 
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res.status(500).json({ message: "Server error while fetching transactions." });
  }
};

