import React, { useEffect, useState } from "react";
import { useParticipantStore } from "../store/participant";
import Sidebar from "../components/Sidebar.jsx";

const ParticipantList = () => {
  const { participants, fetchParticipants, fetchParticipantsByCampaign, updateStatus } =
    useParticipantStore();
  const [campaignId, setCampaignId] = useState("");

  useEffect(() => {
    fetchParticipants();
  }, [fetchParticipants]);

  const handleFilter = () => {
    if (campaignId.trim() === "") {
      fetchParticipants(); // show all
    } else {
      fetchParticipantsByCampaign(campaignId);
    }
  };

  const handleStatusChange = (id, e) => {
    const newStatus = e.target.value;
    updateStatus(id, newStatus);
  };

  return (
    <div className="min-h-screen bg-[#0A1A2F] text-[#DCDCDC] relative">
      <Sidebar />

      <main className="ml-64 p-6 md:p-8">
      <h2 className="text-3xl font-bold text-[#2ECC71] mb-6 text-center">
        Participants List
      </h2>

      <div className="flex justify-center mb-6 flex-wrap gap-2">
        <input
          type="text"
          placeholder="Enter Campaign ID..."
          value={campaignId}
          onChange={(e) => setCampaignId(e.target.value)}
          className="w-80 p-3 rounded-l-lg bg-[#152D45] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2ECC71]"
        />
        <button
          onClick={handleFilter}
          className="bg-[#2ECC71] text-[#0A1A2F] px-5 py-3 rounded-r-lg font-semibold hover:bg-[#27AE60]"
        >
          Filter
        </button>
      </div>

      <div className="flex justify-center">
        <div className="w-full max-w-6xl overflow-x-auto rounded-lg">
          <table className="min-w-full table-auto bg-[#152D45] rounded-lg shadow-lg text-left">
            <thead>
              <tr className="border-b border-gray-600">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact No</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Age</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">Campaign ID</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {participants && participants.length > 0 ? (
                participants.map((p) => (
                  <tr
                    key={p._id || Math.random()}
                    className="border-b border-gray-700 hover:bg-[#1A2C44]"
                  >
                    <td className="px-4 py-3">{p.name || "-"}</td>
                    <td className="px-4 py-3">{p.contactNo || "-"}</td>
                    <td className="px-4 py-3">{p.email || "-"}</td>
                    <td className="px-4 py-3">{p.age || "-"}</td>
                    <td className="px-4 py-3">{p.address || "-"}</td>
                    <td className="px-4 py-3">{p.gender || "-"}</td>
                    <td className="px-4 py-3">{p.campaignId?._id || p.campaignId || "-"}</td>
                    <td className="px-4 py-3">
                      <select
                        value={p.status || ""}
                        onChange={(e) => handleStatusChange(p._id, e)}
                        className="bg-[#0A1A2F] text-white px-2 py-1 rounded border border-gray-500 focus:outline-none"
                      >
                        <option value="">-- Select --</option>
                        <option value="Participated">Participated</option>
                        <option value="Not Participated">Not Participated</option>
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-6 text-gray-400">
                    No participants found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>

    </div>
  );
};

export default ParticipantList;
