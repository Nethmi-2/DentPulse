import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  contactNo: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female"], required: true },
  status: { type: String, default: null },
}, { timestamps: true });

export default mongoose.model("Participant", participantSchema);
