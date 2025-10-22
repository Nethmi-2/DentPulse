import express from "express";
import { getReportData } from "../controllers/reports.controller.js";

const router = express.Router();

// Fetch all report data
router.get("/", getReportData);

export default router;
