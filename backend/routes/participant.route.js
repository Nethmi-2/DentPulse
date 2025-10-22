import express from "express";
import {
  registerParticipant,
  getParticipants,
  getParticipantsByCampaign,
  getParticipantCounts,
  updateParticipantStatus,
} from "../controllers/participant.controller.js";

const router = express.Router();

router.post("/", registerParticipant);
router.get("/", getParticipants);
router.get("/campaign/:id", getParticipantsByCampaign);
router.get("/summary", getParticipantCounts);
router.put("/:id/status", updateParticipantStatus);

export default router;
