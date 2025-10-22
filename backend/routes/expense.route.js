import express from "express";
import { addExpense, getExpensesByCampaign, deleteExpense, getAllExpenses } from "../controllers/expense.controller.js";
import { getCampaignFinanceSummary } from "../controllers/expense.controller.js";

const router = express.Router();

router.get("/finance-summary", getCampaignFinanceSummary);

// Create expense
router.post("/", addExpense);

router.get("/", getAllExpenses);

// Get all expenses for a campaign
router.get("/:campaignId", getExpensesByCampaign);

// Delete expense (optional)
router.delete("/:id", deleteExpense);

export default router;
