// controllers/finance.controller.js
import Campaign from "../models/product.model.js";
import Expense from "../models/expense.model.js";

// Get monthly finance summary
export const getMonthlyFinanceSummary = async (req, res) => {
  try {
    const month = parseInt(req.query.month) || new Date().getMonth() + 1; // 1-12
    const year = parseInt(req.query.year) || new Date().getFullYear();

    // First and last day of month
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59);

    // Find campaigns in the month
    const campaigns = await Campaign.find({
      date: { $gte: startDate, $lte: endDate },
    });

    const summary = await Promise.all(
      campaigns.map(async (c) => {
        // 👇 fetch all expenses instead of just sum
        const expenses = await Expense.find({ campaignId: c._id });

        const totalExpenses = expenses.reduce(
          (sum, e) => sum + e.amount,
          0
        );

        return {
          _id: c._id,
          summary: c.summary,
          budget: c.budget,
          totalExpenses,
          remainingBudget: c.budget - totalExpenses,
          expenses: expenses.map((e) => ({
            title: e.title,
            amount: e.amount,
          })), 
        };
      })
    );

    res.json({ success: true, summary });
  } catch (err) {
    console.error("Finance Summary Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
