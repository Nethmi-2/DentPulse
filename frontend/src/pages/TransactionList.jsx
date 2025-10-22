import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Folder, FileText, DollarSign } from "lucide-react";

const TransactionList = () => {
  const navigate = useNavigate();

  const [bills, setBills] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const billsRes = await fetch("/api/bills");
        const billsData = await billsRes.json();
        setBills(billsData.data || []);

        const expensesRes = await fetch("/api/expenses");
        const expensesData = await expensesRes.json();
        setExpenses(expensesData || []);

        const transactionsRes = await fetch("/api/transactions");
        const transactionsData = await transactionsRes.json();
        setTransactions(transactionsData || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A1A2F] text-[#BDC3C7] relative flex">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-[#152D45] shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-[#2ECC71]">DentPulse</h2>
        <nav className="space-y-4">
          <button
            onClick={() => navigate("/financedashboard")}
            className="block hover:text-[#2ECC71] text-left w-full"
          >
            Finance Dashboard
          </button>
          <button
            onClick={() => navigate("/addserviceform")}
            className="block hover:text-[#2ECC71] text-left w-full"
          >
            Services
          </button>
          <button
            onClick={() => navigate("/transactionlist")}
            className="block hover:text-[#2ECC71] text-left w-full"
          >
            Transactions
          </button>
          <button
            onClick={() => navigate("/reports")}
            className="block hover:text-[#2ECC71] text-left w-full"
          >
            Report
          </button>
          <button
            onClick={() => navigate("/createbill")}
            className="block hover:text-[#2ECC71] text-left w-full"
          >
            Billing
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-6 flex-1 flex flex-col gap-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Transaction List</h1>

        {/* Bills Table */}
        <section className="bg-[#152D45] p-6 rounded-3xl shadow-md overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <FileText size={20} /> Bills
          </h2>
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="px-4 py-2">Contact No</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Paid</th>
                <th className="px-4 py-2">Balance</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((b) => (
                <tr
                  key={b._id}
                  className="border-b border-gray-700 hover:bg-[#1A2C44]"
                >
                  <td className="px-4 py-2">{b.contactNo}</td>
                  <td className="px-4 py-2">Rs.{b.total}</td>
                  <td className="px-4 py-2">Rs.{b.paid}</td>
                  <td className="px-4 py-2">Rs.{b.balance}</td>
                  <td className="px-4 py-2">
                    {new Date(b.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Expenses Table */}
        <section className="bg-[#152D45] p-6 rounded-3xl shadow-md overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <DollarSign size={20} /> Campaign Expenses
          </h2>
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="px-4 py-2">Campaign ID</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((e) => (
                <tr
                  key={e._id}
                  className="border-b border-gray-700 hover:bg-[#1A2C44]"
                >
                  <td className="px-4 py-2">{e.campaignId || "-"}</td>
                  <td className="px-4 py-2">{e.title}</td>
                  <td className="px-4 py-2">Rs.{e.amount}</td>
                  <td className="px-4 py-2">{e.category}</td>
                  <td className="px-4 py-2">
                    {new Date(e.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Other Transactions Table */}
        <section className="bg-[#152D45] p-6 rounded-3xl shadow-md overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Folder size={20} /> Other Transactions
          </h2>
          <table className="w-full text-left border-collapse min-w-max">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr
                  key={t._id}
                  className="border-b border-gray-700 hover:bg-[#1A2C44]"
                >
                  <td className="px-4 py-2">{t.type}</td>
                  <td className="px-4 py-2">{t.category}</td>
                  <td className="px-4 py-2">Rs.{t.amount}</td>
                  <td className="px-4 py-2">
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">{t.description || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default TransactionList;
