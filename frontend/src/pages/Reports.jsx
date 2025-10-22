import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Reports = () => {
  const [summary, setSummary] = useState({});
  const [bills, setBills] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Fetch all reports
  const fetchReports = async () => {
    try {
      const query = new URLSearchParams({ from, to }).toString();
      const res = await fetch(`/api/reports?${query}`);
      const data = await res.json();

      if (data.success) {
        const { bills, expenses, transactions } = data.data;

        // Summary calculations
        const income = bills.reduce((sum, b) => sum + b.total, 0);
        const expenseTotal = expenses.reduce((sum, e) => sum + e.amount, 0);

        setSummary({
          income,
          expenses: expenseTotal,
          transactions: transactions.length,
        });
        setBills(bills);
        setExpenses(expenses);
        setTransactions(transactions);
      }
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Export Summary PDF
  const exportSummaryPDF = () => {
    const doc = new jsPDF();
    doc.text("DentPulse - Financial Summary", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Income", "Expenses", "Net", "Transactions"]],
      body: [
        [
          `Rs. ${summary.income || 0}`,
          `Rs. ${summary.expenses || 0}`,
          `Rs. ${(summary.income || 0) - (summary.expenses || 0)}`,
          summary.transactions || 0,
        ],
      ],
      headStyles: {
        fillColor: [46, 204, 113],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        halign: "center",
      },
      bodyStyles: { halign: "center" },
    });

    doc.save("summary-report.pdf");
  };

  // Export Detailed PDF
  const exportDetailedPDF = () => {
    const doc = new jsPDF();
    doc.text("DentPulse - Detailed Financial Report", 14, 20);

    // Bills Table
    autoTable(doc, {
      startY: 30,
      head: [["Patient", "Contact", "Total", "Paid", "Balance"]],
      body: bills.map((b) => [
        b.patientName,
        b.contactNo,
        `Rs. ${b.total}`,
        `Rs. ${b.paid}`,
        `Rs. ${b.balance}`,
      ]),
      headStyles: {
        fillColor: [46, 204, 113],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
    });

    // Expenses Table
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Campaign", "Amount", "Date"]],
      body: expenses.map((e) => [
        e.title,
        `Rs. ${e.amount}`,
        new Date(e.date).toISOString().split("T")[0], // only date
      ]),
      headStyles: {
        fillColor: [46, 204, 113],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
    });

    // Transactions Table
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Description", "Amount", "Type", "Date"]],
      body: transactions.map((t) => [
        t.description,
        `Rs. ${t.amount}`,
        t.type,
        new Date(t.date).toISOString().split("T")[0], // only date
      ]),
      headStyles: {
        fillColor: [46, 204, 113],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
    });

    doc.save("detailed-report.pdf");
  };

  return (
    <div className="flex min-h-screen bg-[#0A1A2F] text-[#BDC3C7]">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-[#152D45] shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-[#2ECC71]">DentPulse</h2>
        <nav className="space-y-4 text-left">
          <a href="/financedashboard" className="block hover:text-[#2ECC71]">
            Finance Dashboard
          </a>
          <a href="/addserviceform" className="block hover:text-[#2ECC71]">
            Services
          </a>
          <a href="/transactionlist" className="block hover:text-[#2ECC71]">
            Transactions
          </a>
          <a href="/reports" className="block hover:text-[#2ECC71]">
            Reports
          </a>
          <a href="/createbill" className="block hover:text-[#2ECC71]">Billing</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold text-[#2ECC71] mb-6">Reports</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#152D45] p-4 rounded-2xl shadow border border-gray-700">
            <h3 className="text-lg font-semibold">Income</h3>
            <p className="text-2xl text-[#2ECC71]">Rs. {summary.income || 0}</p>
          </div>
          <div className="bg-[#152D45] p-4 rounded-2xl shadow border border-gray-700">
            <h3 className="text-lg font-semibold">Expenses</h3>
            <p className="text-2xl text-red-400">Rs. {summary.expenses || 0}</p>
          </div>
          <div className="bg-[#152D45] p-4 rounded-2xl shadow border border-gray-700">
            <h3 className="text-lg font-semibold">Net</h3>
            <p className="text-2xl text-blue-400">
              Rs. {(summary.income || 0) - (summary.expenses || 0)}
            </p>
          </div>
          <div className="bg-[#152D45] p-4 rounded-2xl shadow border border-gray-700">
            <h3 className="text-lg font-semibold">Transactions</h3>
            <p className="text-2xl text-yellow-400">{summary.transactions || 0}</p>
          </div>
        </div>

        {/* Date Filter */}
        <div className="flex gap-4 mb-8">
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="p-3 rounded-xl bg-[#1A2C44] text-[#DCDCDC] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#2ECC71]"
          />
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="p-3 rounded-xl bg-[#1A2C44] text-[#DCDCDC] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#2ECC71]"
          />
          <button
            onClick={fetchReports}
            className="px-5 py-2 rounded-xl bg-[#2ECC71] hover:bg-[#27AE60] text-[#0A1A2F] font-semibold transition"
          >
            Apply
          </button>
        </div>

        {/* Tables */}
        <div className="space-y-10">
          {/* Bills Table */}
          <div>
            <h2 className="text-xl font-semibold text-[#2ECC71] mb-2">Bills (Income)</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto bg-[#152D45] rounded-2xl border border-gray-700 text-left">
                <thead className="bg-[#1A2C44] text-[#2ECC71]">
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-600">Patient</th>
                    <th className="px-4 py-2 border-b border-gray-600">Contact</th>
                    <th className="px-4 py-2 border-b border-gray-600">Total</th>
                    <th className="px-4 py-2 border-b border-gray-600">Paid</th>
                    <th className="px-4 py-2 border-b border-gray-600">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {bills.map((b, idx) => (
                    <tr key={idx} className="border-t border-gray-700 hover:bg-[#1A2C44]">
                      <td className="px-4 py-2">{b.patientName}</td>
                      <td className="px-4 py-2">{b.contactNo}</td>
                      <td className="px-4 py-2">Rs. {b.total}</td>
                      <td className="px-4 py-2">Rs. {b.paid}</td>
                      <td className="px-4 py-2">Rs. {b.balance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Expenses Table */}
          <div>
            <h2 className="text-xl font-semibold text-[#2ECC71] mb-2">Campaign Budgets</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto bg-[#152D45] rounded-2xl border border-gray-700 text-left">
                <thead className="bg-[#1A2C44] text-[#2ECC71]">
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-600">Campaign</th>
                    <th className="px-4 py-2 border-b border-gray-600">Amount</th>
                    <th className="px-4 py-2 border-b border-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((e, idx) => (
                    <tr key={idx} className="border-t border-gray-700 hover:bg-[#1A2C44]">
                      <td className="px-4 py-2">{e.title}</td>
                      <td className="px-4 py-2">Rs. {e.amount}</td>
                      <td className="px-4 py-2">{new Date(e.date).toISOString().split("T")[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Other Transactions Table */}
          <div>
            <h2 className="text-xl font-semibold text-[#2ECC71] mb-2">Other Transactions</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto bg-[#152D45] rounded-2xl border border-gray-700 text-left">
                <thead className="bg-[#1A2C44] text-[#2ECC71]">
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-600">Description</th>
                    <th className="px-4 py-2 border-b border-gray-600">Amount</th>
                    <th className="px-4 py-2 border-b border-gray-600">Type</th>
                    <th className="px-4 py-2 border-b border-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t, idx) => (
                    <tr key={idx} className="border-t border-gray-700 hover:bg-[#1A2C44]">
                      <td className="px-4 py-2">{t.description}</td>
                      <td className="px-4 py-2">Rs. {t.amount}</td>
                      <td className="px-4 py-2">{t.type}</td>
                      <td className="px-4 py-2">{new Date(t.date).toISOString().split("T")[0]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="mt-10 flex gap-4">
          <button
            onClick={exportSummaryPDF}
            className="px-5 py-2 rounded-xl bg-[#2ECC71] text-white font-semibold"
          >
            Export Summary PDF
          </button>
          <button
            onClick={exportDetailedPDF}
            className="px-5 py-2 rounded-xl bg-[#2ECC71] text-white font-semibold"
          >
            Export Detailed PDF
          </button>
        </div>
      </main>
    </div>
  );
};

export default Reports;
