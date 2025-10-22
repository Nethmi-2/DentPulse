import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddTransactionForm = () => {
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Example categories for dropdown
  const categories = type === "income" 
    ? ["Sponsorship", "Donations", "Sales", "Other"] 
    : ["Venue", "Marketing", "Logistics", "Staff", "Misc"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0,0,0,0);
    if (selectedDate > today) {
      alert("Date cannot be in the future!");
      return;
    }

    const transactionData = { type, category, amount: Number(amount), date, description };

    try {
      await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
      });

      alert("Transaction added successfully!");
      navigate("/financedashboard");
    } catch (err) {
      console.error("Failed to add transaction", err);
      alert("Failed to add transaction");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1A2F] text-[#BDC3C7] relative">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-[#152D45] shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-[#2ECC71]">DentPulse</h2>
        <nav className="space-y-4 text-left">
          <a href="/financedashboard" className="block hover:text-[#2ECC71]">Finance Dashboard</a>
          <a href="/transactionlist" className="block hover:text-[#2ECC71]">Transactions</a>
          <a href="/reports" className="block hover:text-[#2ECC71]">Reports</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-6 flex justify-center">
        <form onSubmit={handleSubmit} className="bg-[#152D45] p-8 rounded-3xl w-full max-w-md shadow-2xl border border-gray-700">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-[#2ECC71]">Add Transaction</h2>
            <button type="button" onClick={() => navigate("/financedashboard")} className="text-gray-400 hover:text-white">
              <X size={28} />
            </button>
          </div>

          {/* Transaction Type */}
          <select 
            value={type} 
            onChange={(e) => { setType(e.target.value); setCategory(""); }} 
            className="w-full p-3 mb-4 rounded-xl bg-[#1A2C44] text-[#DCDCDC] border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" 
            required
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Category Dropdown */}
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            className="w-full p-3 mb-4 rounded-xl bg-[#1A2C44] text-[#DCDCDC] border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" 
            required
          >
            <option value="" disabled>Select Category</option>
            {categories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Amount */}
          <input 
            type="number" 
            placeholder="Amount" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            className="w-full p-3 mb-4 rounded-xl bg-[#1A2C44] text-[#DCDCDC] border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" 
            required 
          />

          {/* Date */}
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            className="w-full p-3 mb-4 rounded-xl bg-[#1A2C44] text-[#DCDCDC] border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" 
            required 
          />

          {/* Description */}
          <input 
            type="text" 
            placeholder="Description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="w-full p-3 mb-6 rounded-xl bg-[#1A2C44] text-[#DCDCDC] border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2ECC71]" 
          />

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => navigate("/financedashboard")} 
              className="px-5 py-2 rounded-xl bg-gray-600 hover:bg-gray-700 text-white font-medium transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-5 py-2 rounded-xl bg-[#2ECC71] hover:bg-[#27AE60] text-[#0A1A2F] font-semibold transition"
            >
              Add
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddTransactionForm;
