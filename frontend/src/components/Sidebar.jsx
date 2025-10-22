import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-[#152D45] shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#2ECC71]">DentPulse</h2>
      <nav className="space-y-4">
        <Link to="/" className="block hover:text-[#2ECC71]">Dashboard</Link>
        <Link to="/campaignlist" className="block hover:text-[#2ECC71]">All Campaigns</Link>
        <Link to="/campaignfinance" className="block hover:text-[#2ECC71]">Campaign Expenses</Link>
        <Link to="/participantlist" className="block hover:text-[#2ECC71]">All Participants</Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
