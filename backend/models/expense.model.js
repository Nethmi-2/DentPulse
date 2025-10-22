import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // optional if tied to campaigns
    },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true } // for sorting
);

export default mongoose.model("Expense", expenseSchema);
