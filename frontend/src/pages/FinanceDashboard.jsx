import React, { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PlusCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useNavigate } from "react-router-dom";

const FinanceDashboard = () => {
  const navigate = useNavigate();

  //  Mock Data
  const [transactions, setTransactions] = useState([
    { id: 1, type: "income", category: "Sponsorship", amount: 50000, date: "2025-09-01", description: "Company A Sponsorship" },
    { id: 2, type: "expense", category: "Venue", amount: 20000, date: "2025-09-03", description: "Hall booking" },
    { id: 3, type: "expense", category: "Marketing", amount: 8000, date: "2025-09-05", description: "Social Media Ads" },
    { id: 4, type: "income", category: "Donations", amount: 15000, date: "2025-09-10", description: "Community contributions" },
  ]);

  //  Summary Calculations
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  //  Chart Data
  const monthlyData = [
    { month: "Jan", income: 20000, expense: 10000 },
    { month: "Feb", income: 30000, expense: 15000 },
    { month: "Mar", income: 25000, expense: 18000 },
    { month: "Apr", income: 40000, expense: 22000 },
  ];

  const expenseCategories = [
    { name: "Venue", value: 20000 },
    { name: "Marketing", value: 8000 },
    { name: "Logistics", value: 5000 },
    { name: "Misc", value: 3000 },
  ];

  const COLORS = ["#E74C3C", "#3498DB", "#9B59B6", "#F1C40F"];

  return (
    <div className="min-h-screen bg-[#0A1A2F] text-[#BDC3C7] relative">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-[#152D45] shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-[#2ECC71]">DentPulse</h2>
        <nav className="space-y-4 text-left">
          <a href="/financedashboard" className="block hover:text-[#2ECC71]">Finance Dashboard</a>
          <a href="/addserviceform" className="block hover:text-[#2ECC71]">Services</a>
          <a href="/transactionlist" className="block hover:text-[#2ECC71]">Transactions</a>
          <a href="/reports" className="block hover:text-[#2ECC71]">Reports</a>
          <a href="/createbill" className="block hover:text-[#2ECC71]">Billing</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#BDC3C7]">Finance Dashboard</h1>
          <button 
            className="flex items-center gap-2 bg-[#2ECC71] text-white px-4 py-2 rounded-lg hover:bg-[#27AE60] transition"
            onClick={() => navigate("/addtransaction")}
          >
            <PlusCircle size={20} />
            Add Transaction
          </button>
        </header>

        {/* Summary Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-[#152D45] shadow-md p-6 rounded-xl flex items-center gap-4">
            <TrendingUp className="text-[#2ECC71]" size={32} />
            <div>
              <h3>Total Income</h3>
              <p className="text-2xl font-bold text-[#DCDCDC]">Rs.{totalIncome}</p>
            </div>
          </div>
          <div className="bg-[#152D45] shadow-md p-6 rounded-xl flex items-center gap-4">
            <TrendingDown className="text-red-500" size={32} />
            <div>
              <h3>Total Expenses</h3>
              <p className="text-2xl font-bold text-[#DCDCDC]">Rs.{totalExpenses}</p>
            </div>
          </div>
          <div className="bg-[#152D45] shadow-md p-6 rounded-xl flex items-center gap-4">
            <DollarSign className="text-yellow-400" size={32} />
            <div>
              <h3>Net Balance</h3>
              <p className="text-2xl font-bold text-[#DCDCDC]">Rs.{netBalance}</p>
            </div>
          </div>
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Income vs Expense */}
          <div className="bg-[#152D45] p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-2">Monthly Income vs Expense</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" stroke="#BDC3C7" />
                <YAxis stroke="#BDC3C7" />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#2ECC71" />
                <Bar dataKey="expense" fill="#E74C3C" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Expense Distribution */}
          <div className="bg-[#152D45] p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-2">Expense Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={expenseCategories}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label
                >
                  {expenseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Transactions Table */}
        <section className="bg-[#152D45] p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-b border-gray-700 hover:bg-[#1A2C44]">
                  <td className="px-4 py-2">{t.date}</td>
                  <td className={`px-4 py-2 ${t.type === "income" ? "text-green-400" : "text-red-400"}`}>
                    {t.type}
                  </td>
                  <td className="px-4 py-2">{t.category}</td>
                  <td className="px-4 py-2">Rs.{t.amount}</td>
                  <td className="px-4 py-2">{t.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default FinanceDashboard;
