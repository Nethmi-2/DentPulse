import Bill from "../models/bill.model.js";
import Expense from "../models/expense.model.js";
import Transaction from "../models/transaction.model.js";
import Product from "../models/product.model.js";

// Get summary for reports
export const getReportData = async (req, res) => {
  try {
    const { from, to } = req.query;

    let filter = {};
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }

    const bills = await Bill.find(filter).sort({ createdAt: -1 });
    const expenses = await Expense.find(filter).sort({ createdAt: -1 });
    const transactions = await Transaction.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: { bills, expenses, transactions },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};


