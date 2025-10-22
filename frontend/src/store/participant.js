import { create } from "zustand";

export const useParticipantStore = create((set) => ({
  participants: [],
  setParticipants: (participants) => set({ participants }),

  // Fetch all participants
  fetchParticipants: async () => {
    try {
      const res = await fetch("/api/participants/");
      const data = await res.json();
      if (data.success) {
        set({ participants: data.data });
      }
    } catch (err) {
      console.error("Error fetching participants:", err);
    }
  },

  // Fetch aggregated participant summary
  fetchParticipantSummary: async () => {
    try {
      const res = await fetch("/api/participants/summary");
      const data = await res.json();
      set({ summary: data });
    } catch (err) {
      console.error("Failed to fetch participant summary:", err);
    }
  },

  // Fetch participants by campaignId
  fetchParticipantsByCampaign: async (campaignId) => {
    try {
      const res = await fetch(`/api/participants/campaign/${campaignId}`);
      const data = await res.json();
      if (data.success) {
        set({ participants: data.data });
      } else {
        set({ participants: [] });
      }
    } catch (err) {
      console.error("Error fetching participants by campaign:", err);
    }
  },

  // Register participant
  createParticipant: async (newParticipant) => {
    if (
      !newParticipant.name ||
      !newParticipant.contactNo ||
      !newParticipant.email ||
      !newParticipant.age ||
      !newParticipant.address ||
      !newParticipant.gender ||
      !newParticipant.campaignId
    ) {
      return { success: false, message: "Please fill all fields" };
    }

    const res = await fetch("/api/participants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newParticipant),
    });

    const data = await res.json();

    if (data.success) {
      set((state) => ({
        participants: [...state.participants, data.data],
      }));
      return { success: true, message: "Registered successfully" };
    } else {
      return { success: false, message: data.message };
    }
  },

  // ✅ Update participant status
  updateStatus: async (id, status) => {
    try {
      const res = await fetch(`/api/participants/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (data.success) {
        set((state) => ({
          participants: state.participants.map((p) =>
            p._id === id ? { ...p, status: data.participant.status } : p
          ),
        }));
      } else {
        console.error("Failed to update status:", data.message);
      }
    } catch (err) {
      console.error("Error updating participant status:", err);
    }
  },
}));
