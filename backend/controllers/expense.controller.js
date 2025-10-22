import Expense from "../models/expense.model.js";
import Product from "../models/product.model.js"

// Add new expense
export const addExpense = async (req, res) => {
  try {
    const { campaignId, title, amount, category } = req.body;
    const expense = new Expense({ campaignId, title, amount, category });
    await expense.save();
    res.status(201).json({ success: true, expense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all expenses for a campaign
export const getExpensesByCampaign = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const expenses = await Expense.find({ campaignId });
    res.status(200).json({ success: true, expenses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Optionally, delete an expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCampaignFinanceSummary = async (req, res) => {
  try {
    const campaigns = await Product.find();

    const summary = await Promise.all(
      campaigns.map(async (c) => {
        const expenses = await Expense.find({ campaignId: c._id });
        const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

        return {
          _id: c._id,
          summary: c.summary,
          budget: c.budget,
          totalExpenses,
          remainingBudget: c.budget - totalExpenses,
        };
      })
    );

    res.status(200).json({ success: true, summary });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all expenses (no campaign filter)
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


