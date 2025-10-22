import React, { useState } from "react";
import { useProductStore } from "../store/product";
import Sidebar from "../components/Sidebar.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  summary: "",
  budget: "",
  audience: "",
  venue: "",
  date: "",
  time: "",
  status: "",
};

const CreateCampaign = () => {
  const [newProduct, setNewProduct] = useState({ ...initialState });
  const [loading, setLoading] = useState(false);
  const { createProduct } = useProductStore();

  const getTodayString = () => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const getTomorrowString = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const minDateForPicker = getTomorrowString();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((p) => ({ ...p, [name]: value }));
  };

  const validateForm = () => {
    // basic checks
    if (!newProduct.summary.trim()) {
      toast.error("Summary is required.");
      return false;
    }
    if (!newProduct.budget || Number(newProduct.budget) <= 0) {
      toast.error("Budget must be greater than 0.");
      return false;
    }
    if (!newProduct.date) {
      toast.error("Please select a date.");
      return false;
    }

    const todayStr = getTodayString(); // YYYY-MM-DD local
    const selectedStr = newProduct.date; // should be YYYY-MM-DD from input

    // DEBUG: log what's being compared
    console.log("Date validation -> selectedStr:", selectedStr, "todayStr:", todayStr);

    // Primary check: string comparison (works for YYYY-MM-DD)
    if (selectedStr <= todayStr) {
      toast.error("Please choose a future date (after today).");
      return false;
    }

    // (Optional) Defensive fallback using Date objects — helps catch malformed strings
    try {
      const [y, m, d] = selectedStr.split("-");
      const selDate = new Date(Number(y), Number(m) - 1, Number(d));
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      console.log("Date validation -> selDate:", selDate.toISOString(), "today:", today.toISOString());
      if (selDate <= today) {
        toast.error("Please choose a future date (after today).");
        return false;
      }
    } catch (err) {
      console.warn("Date parse fallback failed", err);
      toast.error("Invalid date format.");
      return false;
    }

    if (!newProduct.status) {
      toast.error("Please select a status.");
      return false;
    }

    return true;
  };

  const handleAddCampaign = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await createProduct(newProduct);
      console.log("createProduct result:", result);

      const success =
        (result && result.success === true) ||
        (result && (result._id || result.id || result.createdAt)) ||
        result === true;

      const message = (result && result.message) || "Campaign created successfully.";

      if (success) {
        toast.success(message);
        setNewProduct({ ...initialState });
      } else {
        const errMsg =
          (result && (result.message || result.error || result.msg)) || "Failed to create campaign.";
        toast.error(errMsg);
      }
    } catch (err) {
      console.error("Create campaign error:", err);
      toast.error("Server error. Check console/network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1A2F] text-[#DCDCDC] relative">
      <Sidebar />

      <main className="ml-64 p-6 md:p-8 flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="bg-[#152D45] w-full rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-3xl font-bold mb-6 text-[#2ECC71] text-center">Create Campaign</h2>

            <form className="flex flex-col gap-4" onSubmit={handleAddCampaign}>
              <div className="flex flex-col">
                <label className="text-[#BDC3C7] mb-2 font-medium">Summary</label>
                <textarea
                  name="summary"
                  rows="3"
                  placeholder="Enter campaign summary..."
                  value={newProduct.summary}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#0A1A2F] text-[#DCDCDC] border border-gray-600 focus:outline-none focus:border-[#2ECC71]"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[#BDC3C7] mb-2 font-medium">Budget (Rs.)</label>
                <input
                  name="budget"
                  type="number"
                  placeholder="Enter budget"
                  value={newProduct.budget}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#0A1A2F] text-[#DCDCDC] border border-gray-600 focus:outline-none focus:border-[#2ECC71]"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[#BDC3C7] mb-2 font-medium">Target Audience</label>
                <input
                  name="audience"
                  type="text"
                  placeholder="e.g., Children, Elders"
                  value={newProduct.audience}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#0A1A2F] text-[#DCDCDC] border border-gray-600 focus:outline-none focus:border-[#2ECC71]"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-[#BDC3C7] mb-2 font-medium">Venue</label>
                <input
                  name="venue"
                  type="text"
                  placeholder="Enter venue"
                  value={newProduct.venue}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#0A1A2F] text-[#DCDCDC] border border-gray-600 focus:outline-none focus:border-[#2ECC71]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[#BDC3C7] mb-2 font-medium">Date</label>
                  <input
                    name="date"
                    type="date"
                    min={minDateForPicker}
                    value={newProduct.date}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#0A1A2F] text-[#DCDCDC] border border-gray-600 focus:outline-none focus:border-[#2ECC71]"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-[#BDC3C7] mb-2 font-medium">Time</label>
                  <input
                    name="time"
                    type="time"
                    value={newProduct.time}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-[#0A1A2F] text-[#DCDCDC] border border-gray-600 focus:outline-none focus:border-[#2ECC71]"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label className="text-[#BDC3C7] mb-2 font-medium">Status</label>
                <select
                  name="status"
                  value={newProduct.status}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-[#0A1A2F] text-[#DCDCDC] border border-gray-600 focus:outline-none focus:border-[#2ECC71]"
                >
                  <option value="">-- Select Status --</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 mt-4 ${loading ? "bg-gray-500" : "bg-[#2ECC71] hover:bg-[#27AE60]"} text-[#0A1A2F] font-bold rounded-lg transition-colors`}
              >
                {loading ? "Creating..." : "Create Campaign"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </div>
  );
};

export default CreateCampaign;
