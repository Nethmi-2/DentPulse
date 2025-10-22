import React, { useEffect } from "react";
import { useProductStore } from "../store/product";
import { useParticipantStore } from "../store/participant";
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
import { PlusCircle, FolderOpen, Award, BarChart2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const COLORS = ["#2ECC71", "#3498DB", "#E74C3C", "#F1C40F"];

const CampaignDashboard = () => {
  const { products, fetchProducts } = useProductStore();
  const { summary = [], fetchParticipantSummary } = useParticipantStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchParticipantSummary();
  }, [fetchProducts, fetchParticipantSummary]);

  // Safe mapping for participants chart
  const participantsData = (summary || []).map((p) => ({
    name: p.campaignId?.summary || "Unknown Campaign",
    participants: p.count,
  }));

  //  Filter only completed campaigns for budget chart
  const completedBudgetData = products
    .filter((p) => p.status === "Completed")
    .map((p) => ({
      name: p.summary,
      value: p.budget,
    }));

  const totalCampaigns = products.length;
  const biggestCampaign =
    products.length > 0
      ? products.reduce((a, b) => (a.budget > b.budget ? a : b)).summary
      : "-";
  const completedCampaigns = products.filter((p) => p.status === "Completed").length;

  return (
    <div className="min-h-screen bg-[#0A1A2F] text-[#BDC3C7] relative">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full w-64 bg-[#152D45] shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-[#2ECC71]">DentPulse</h2>
        <nav className="space-y-4">
          <a href="/" className="block hover:text-[#2ECC71]">Dashboard</a>
          <a href="/campaignlist" className="block hover:text-[#2ECC71]">All Campaigns</a>
          <a href="/campaignfinance" className="block hover:text-[#2ECC71]">Campaign Expenses</a>
          <a href="/participantlist" className="block hover:text-[#2ECC71]">All Participants</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#BDC3C7]">Campaign Dashboard</h1>
          <button
            className="flex items-center gap-2 bg-[#2ECC71] text-white px-4 py-2 rounded-lg hover:bg-[#27AE60] transition"
            onClick={() => navigate("/createcampaign")}
          >
            <PlusCircle size={20} /> Create Campaign
          </button>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-[#152D45] shadow-md p-6 rounded-xl flex items-center gap-4">
            <FolderOpen className="text-[#2ECC71]" size={32} />
            <div>
              <h3 className="text-[#BDC3C7]">Total Campaigns</h3>
              <p className="text-2xl font-bold text-[#DCDCDC]">{totalCampaigns}</p>
            </div>
          </div>

          <div className="bg-[#152D45] shadow-md p-6 rounded-xl flex items-center gap-4">
            <Award className="text-[#2ECC71]" size={32} />
            <div>
              <h3 className="text-[#BDC3C7]">Biggest Campaign</h3>
              <p className="text-xl font-semibold text-[#DCDCDC]">{biggestCampaign}</p>
            </div>
          </div>

          <div className="bg-[#152D45] shadow-md p-6 rounded-xl flex items-center gap-4">
            <BarChart2 className="text-[#2ECC71]" size={32} />
            <div>
              <h3 className="text-[#BDC3C7]">Completed Campaigns</h3>
              <p className="text-2xl font-bold text-[#DCDCDC]">{completedCampaigns}</p>
            </div>
          </div>
        </section>

        {/* Campaign Summary Section */}
        <section className="bg-[#152D45] shadow-md p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4 text-[#BDC3C7]">Campaign Summary</h2>

          <div className="flex flex-col gap-24">
            {/* Participants Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={participantsData}>
                  <XAxis dataKey="name" stroke="#BDC3C7" />
                  <YAxis stroke="#BDC3C7" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="participants" fill="#2ECC71" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* ✅ Completed Campaign Budget Pie Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={completedBudgetData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {completedBudgetData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CampaignDashboard;
