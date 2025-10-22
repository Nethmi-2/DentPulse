// routes/serviceRoutes.js
import express from "express";
import { createService, getServices, getServiceByTitle } from "../controllers/service.controller.js";

const router = express.Router();

router.post("/", createService);         // Add new service
router.get("/", getServices);            // Get all services
router.get("/:title", getServiceByTitle); // Get by title

export default router;
