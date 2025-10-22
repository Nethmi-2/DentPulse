import Participant from "../models/participant.model.js";


export const registerParticipant = async (req, res) => {
  try {
    const participant = new Participant(req.body);
    await participant.save();
    res.status(201).json({ success: true, data: participant });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


export const getParticipants = async (req, res) => {
  try {
    const participants = await Participant.find().populate("campaignId", "summary date time venue");
    res.status(200).json({ success: true, data: participants });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getParticipantsByCampaign = async (req, res) => {
  try {
    const participants = await Participant.find({ campaignId: req.params.id });
    res.status(200).json({ success: true, data: participants });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get participant count per campaign
export const getParticipantCounts = async (req, res) => {
  try {
    const participants = await Participant.aggregate([
      {
        $group: {
          _id: "$campaignId",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "products", // campaign collection
          localField: "_id",
          foreignField: "_id",
          as: "campaign",
        },
      },
      { $unwind: "$campaign" },
      {
        $project: {
          _id: 0,
          count: 1,
          campaignId: {
            _id: "$campaign._id",
            summary: "$campaign.summary",
          },
        },
      },
    ]);

    res.json(participants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateParticipantStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Participant.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json({ success: true, participant: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

