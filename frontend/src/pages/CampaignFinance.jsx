import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import jsPDF from "jspdf";

const CampaignFinance = () => {
  const [summary, setSummary] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch(`/api/finance/monthly-summary?month=${month}&year=${year}`);
        const data = await res.json();
        if (data.success) setSummary(data.summary);
      } catch (err) {
        console.error("Failed to fetch finance summary:", err);
      }
    };
    fetchSummary();
  }, [month, year]);

  const handleDownloadPDF = () => {
  if (summary.length === 0) return;

  const doc = new jsPDF();
  doc.setFontSize(18);
  doc.text(`Campaign Finance Report - ${month}/${year}`, 105, 15, { align: "center" });
  doc.setFontSize(12);

  let y = 30;
  summary.forEach((c, idx) => {
    doc.setFont("helvetica", "bold");
    doc.text(`${idx + 1}. ${c.summary}`, 20, y);
    doc.setFont("helvetica", "normal");
    y += 8;

    doc.text(`Estimated Budget: Rs. ${c.budget}`, 25, y);
    y += 8;
    doc.text(`Total Expenses: Rs. ${c.totalExpenses}`, 25, y);
    y += 8;
    doc.text(
      `Remaining Budget: Rs. ${c.remainingBudget}`,
      25,
      y
    );
    y += 10;

    // List each expense under campaign
    if (c.expenses && c.expenses.length > 0) {
      doc.text("Expenses:", 25, y);
      y += 8;
      c.expenses.forEach((e) => {
        doc.text(`- ${e.title}: Rs. ${e.amount}`, 30, y);
        y += 8;
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
      });
    } else {
      doc.text("No expenses recorded.", 25, y);
      y += 10;
    }

    y += 10;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  });

  doc.save(`Campaign_Finance_Report_${month}_${year}.pdf`);
};


  return (
    <div className="min-h-screen bg-[#0A1A2F] text-[#DCDCDC] relative">
      <Sidebar />
      <main className="ml-64 p-6 md:p-8">
        <h2 className="text-3xl font-bold text-[#2ECC71] mb-6 text-center">
          Campaign Finance Summary
        </h2>

        {/* Month/Year Filter */}
        <div className="flex justify-center gap-4 mb-6">
          <input
            type="number"
            min="1"
            max="12"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="p-2 rounded bg-[#152D45] text-white"
          />
          <input
            type="number"
            min="2023"
            max="2100"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="p-2 rounded bg-[#152D45] text-white"
          />
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-[#2ECC71] text-[#0A1A2F] font-semibold rounded-lg hover:bg-[#27AE60]"
          >
            Download PDF
          </button>
        </div>

        <div className="w-full max-w-7xl mx-auto overflow-x-auto">
          <table className="w-full bg-[#152D45] rounded-lg shadow-lg">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="px-4 py-3 text-left">Summary</th>
                <th className="px-4 py-3 text-left">Estimated Budget</th>
                <th className="px-4 py-3 text-left">Total Expenses</th>
                <th className="px-4 py-3 text-left">Remaining Budget</th>
              </tr>
            </thead>
            <tbody>
              {summary.length > 0 ? (
                summary.map((c) => (
                  <tr
                    key={c._id}
                    className="border-b border-gray-700 hover:bg-[#1A2C44]"
                  >
                    <td className="px-4 py-3">{c.summary}</td>
                    <td className="px-4 py-3">Rs. {c.budget}</td>
                    <td className="px-4 py-3">Rs. {c.totalExpenses}</td>
                    <td
                      className={`px-4 py-3 font-semibold ${
                        c.remainingBudget < 0 ? "text-red-500" : "text-green-400"
                      }`}
                    >
                      Rs. {c.remainingBudget}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-400">
                    No campaign finance data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default CampaignFinance;
