// routes/finance.js
import express from "express";
import { getMonthlyFinanceSummary } from "../controllers/finance.controller.js";

const router = express.Router();

router.get("/monthly-summary", getMonthlyFinanceSummary);

export default router;
