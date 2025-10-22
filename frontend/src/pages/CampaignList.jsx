import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/product";
import Sidebar from "../components/Sidebar.jsx";
import AddExpenseForm from "./AddExpenseForm.jsx";

const CampaignList = () => {
  const { fetchProducts, products, deleteProduct, updateProductStatus } = useProductStore();
  const [selectedCampaignId, setSelectedCampaignId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDeleteProduct = async (pid) => {
    await deleteProduct(pid);
  };

  const handleStatusChange = async (pid, newStatus) => {
    if (updateProductStatus) {
      await updateProductStatus(pid, newStatus); // Updates backend and state
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1A2F] text-[#DCDCDC] relative">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="ml-64 p-6 md:p-8">
        <h2 className="text-3xl font-bold text-[#2ECC71] mb-6 text-center">
          All Campaigns
        </h2>

        {/* Table */}
        <div className="w-full max-w-6xl mx-auto">
          <table className="w-full table-auto bg-[#152D45] rounded-lg shadow-lg">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="px-2 py-3 text-left">Summary</th>
                <th className="px-2 py-3 text-left">Budget</th>
                <th className="px-2 py-3 text-left">Target</th>
                <th className="px-2 py-3 text-left">Venue</th>
                <th className="px-2 py-3 text-left">Date</th>
                <th className="px-2 py-3 text-left">Time</th>
                <th className="px-2 py-3 text-left">Status</th>
                <th className="px-2 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b border-gray-700 hover:bg-[#1A2C44]"
                  >
                    <td className="px-2 py-3">{product.summary}</td>
                    <td className="px-2 py-3">Rs.{product.budget}</td>
                    <td className="px-2 py-3">{product.audience}</td>
                    <td className="px-2 py-3">{product.venue}</td>
                    <td className="px-2 py-3">{product.date ? new Date(product.date).toLocaleDateString() : "-"}</td>
                    <td className="px-2 py-3">{product.time}</td>
                    <td className="px-2 py-3">
                      <select
                        className="bg-[#0A1A2F] text-white p-1 rounded border border-gray-600 focus:outline-none focus:border-[#2ECC71]"
                        value={product.status}
                        onChange={(e) =>
                          handleStatusChange(product._id, e.target.value)
                        }
                      >
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-2 py-3 flex justify-center gap-2">
                      <button
                        className="bg-[#2ECC71] text-[#0A1A2F] px-3 py-1 rounded hover:bg-[#27AE60]"
                        onClick={() => setSelectedCampaignId(product._id)}
                      >
                        Budget
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-400">
                    No campaigns found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add Expense Form Modal */}
        {selectedCampaignId && (
          <AddExpenseForm
            campaignId={selectedCampaignId}
            onClose={() => setSelectedCampaignId(null)}
          />
        )}
      </main>
    </div>
  );
};

export default CampaignList;
