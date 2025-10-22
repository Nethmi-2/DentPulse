import React, { useState } from "react";
import { X } from "lucide-react"; // optional close icon

const AddExpenseForm = ({ campaignId, onClose }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState(""); // 🔹 for validation messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Validate all fields
    if (!title.trim() || !category) {
      setError("Please fill in all fields.");
      return;
    }

    //  Validate amount > 0
    if (!amount || Number(amount) <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    setError(""); // clear error if valid

    const expenseData = { campaignId, title, amount: Number(amount), category };

    try {
      const res = await fetch("/api/expenses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(expenseData),
      });

      if (res.ok) {
        alert("Expense added successfully!");
        onClose();
      } else {
        const errData = await res.json();
        setError(errData.message || "Failed to save expense.");
      }
    } catch (err) {
      setError("Error connecting to server.");
    }
  };

  return (
    <div className="fixed inset-0 bg-[#0A1A2F] bg-opacity-50 flex justify-center items-center z-50">
      <form
        className="bg-[#152D45] backdrop-blur-md p-8 rounded-2xl w-96 shadow-2xl transform transition-all scale-95 animate-scaleIn"
        onSubmit={handleSubmit}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#2ECC71]">Add Expense</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/*  Error message */}
        {error && (
          <div className="bg-red-600 text-white text-sm p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

        {/* Inputs */}
        <div className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            placeholder="Expense Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#1A2C44] border border-gray-700 text-[#DCDCDC] focus:border-[#2ECC71] focus:ring-1 focus:ring-[#2ECC71] outline-none transition"
            required
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1" //  HTML-level validation
            className="w-full p-3 rounded-lg bg-[#1A2C44] border border-gray-700 text-[#DCDCDC] focus:border-[#2ECC71] focus:ring-1 focus:ring-[#2ECC71] outline-none transition"
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#1A2C44] border border-gray-700 text-[#DCDCDC] focus:border-[#2ECC71] focus:ring-1 focus:ring-[#2ECC71] outline-none transition"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Logistics">Logistics</option>
            <option value="Marketing">Marketing</option>
            <option value="Food & Drinks">Food & Drinks</option>
            <option value="Staff">Staff</option>
            <option value="Miscellaneous">Miscellaneous</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 shadow-md transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#2ECC71] hover:bg-[#27AE60] shadow-md transition text-[#0A1A2F] font-semibold"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm;
