import Bill from "../models/bill.model.js";

// Create Bill
export const createBill = async (req, res) => {
  try {
    const { patientName, contactNo, items, paid } = req.body;

    // calculate total
    const total = items.reduce((sum, item) => sum + item.amount, 0);
    const balance = paid - total;

    const bill = await Bill.create({
      patientName,
      contactNo,
      items,
      total,
      paid,
      balance
    });

    // 🔹 Skip SMS here, just respond
    return res.status(201).json({ success: true, data: bill });
  } catch (error) {
    console.error("Error creating bill:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get All Bills (for income dashboard)
export const getBills = async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: bills }); //  wrap in 'data'
  } catch (error) {
    console.error("Error fetching bills:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getBill = async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 });
    return res.status(200).json(bills); // make consistent with others
  } catch (error) {
    console.error("Error fetching bills:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

