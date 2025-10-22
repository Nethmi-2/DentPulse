import mongoose from "mongoose";

const billItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
});

const billSchema = new mongoose.Schema(
  {
    contactNo: { type: String, required: true },
    items: [billItemSchema],
    total: { type: Number, required: true },
    paid: { type: Number, required: true },
    balance: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true } 
);

export default mongoose.model("Bill", billSchema);
