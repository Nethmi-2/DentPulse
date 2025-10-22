import React, { useState, useEffect } from "react";
import { useProductStore } from "../store/product";
import jsPDF from "jspdf";

const CampaignPage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const [search, setSearch] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    email: "",
    age: "",
    address: "",
    gender: "",
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [lastRegistration, setLastRegistration] = useState(null);

  // Open registration modal
  const handleRegisterClick = (campaign) => {
    setSelectedCampaign(campaign);
  };

  // Update form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit registration with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCampaign) return;

    const age = Number(formData.age);
    if (isNaN(age) || age <= 0 || age >= 100) {
      alert("Please enter a valid age between 1 and 99.");
      return;
    }

    const res = await fetch("/api/participants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, campaignId: selectedCampaign._id }),
    });

    const data = await res.json();
    if (data.success) {
      setLastRegistration({ participant: formData, campaign: selectedCampaign });
      setRegistrationSuccess(true);
    } else {
      alert("Error: " + data.message);
    }
  };

  // PDF download
  const handleDownload = () => {
    if (!lastRegistration) return;

    const { participant, campaign } = lastRegistration;
    const doc = new jsPDF();

    // Format date and time
    const dateObj = new Date(campaign.date);
    const formattedDate = dateObj.toISOString().split("T")[0];
    const formattedTime = dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    doc.setFontSize(20);
    doc.setTextColor("#2ECC71");
    doc.text("Campaign Registration Details", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.setTextColor("#0A1A2F");

    let y = 40;
    doc.text("Participant Information:", 20, y);
    y += 10;
    doc.text(`Name: ${participant.name}`, 20, y);
    y += 8;
    doc.text(`Contact No: ${participant.contactNo}`, 20, y);
    y += 8;
    doc.text(`Email: ${participant.email}`, 20, y);
    y += 8;
    doc.text(`Age: ${participant.age}`, 20, y);
    y += 8;
    doc.text(`Address: ${participant.address}`, 20, y);
    y += 8;
    doc.text(`Gender: ${participant.gender}`, 20, y);

    y += 15;
    doc.text("Campaign Information:", 20, y);
    y += 10;
    doc.text(`Summary: ${campaign.summary}`, 20, y);
    y += 8;
    doc.text(`Audience: ${campaign.audience}`, 20, y);
    y += 8;
    doc.text(`Venue: ${campaign.venue}`, 20, y);
    y += 8;
    doc.text(`Date: ${formattedDate}`, 20, y);
    y += 8;
    doc.text(`Time: ${formattedTime}`, 20, y);

    doc.save("campaign_registration.pdf");
  };

  // Back button
  const handleBack = () => {
    setRegistrationSuccess(false);
    setSelectedCampaign(null);
    setFormData({
      name: "",
      contactNo: "",
      email: "",
      age: "",
      address: "",
      gender: "",
    });
    setLastRegistration(null);
  };

  // Filter campaigns: only future or today
  const today = new Date().toISOString().split("T")[0];
  const filteredCampaigns = products
    .filter((c) => c.summary.toLowerCase().includes(search.toLowerCase()))
    .filter((c) => c.date >= today);

  // SUCCESS PAGE
  if (registrationSuccess && lastRegistration) {
    const { campaign } = lastRegistration;
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#0A1A2F] text-[#BDC3C7] px-6">
        <div className="text-center">
          <div className="text-9xl mb-6">👍</div>
          <h1 className="text-4xl font-bold mb-4 text-[#2ECC71]">
            Successfully Registered!
          </h1>
          <p className="mb-6">You have registered for {campaign.summary}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleDownload}
              className="px-6 py-3 bg-[#2ECC71] text-[#0A1A2F] rounded-lg font-semibold hover:bg-[#27AE60]"
            >
              Download PDF
            </button>
            <button
              onClick={handleBack}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN PAGE
  return (
    <div className="min-h-screen w-full bg-[#0A1A2F] text-[#BDC3C7] flex flex-col items-center px-6 py-10">
      <div className="w-full max-w-3xl mb-6">
        <input
          type="text"
          placeholder="Search campaigns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg bg-[#152D45] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2ECC71]"
        />
      </div>

      <div className="w-full max-w-4xl mb-8">
        <img
          src="/images/dental2.png"
          alt="Dental Health"
          className="rounded-2xl shadow-lg w-full object-cover h-64"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {filteredCampaigns.map((product) => {
          const dateObj = new Date(product.date);
          const formattedDate = dateObj.toISOString().split("T")[0];

          return (
            <div
              key={product._id}
              className="relative group bg-[#152D45] p-6 rounded-2xl shadow-md transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              <h3 className="text-xl font-semibold mb-2">{product.summary}</h3>
              <p className="text-sm mb-4 text-gray-300">for {product.audience}</p>
              <p className="text-sm mb-2">📍 {product.venue}</p>
              <p className="text-sm mb-4">
                📅 {formattedDate} ⏰ {product.time}
              </p>
              <button
                onClick={() => handleRegisterClick(product)}
                className="w-full bg-[#BDC3C7] text-[#0A1A2F] font-semibold py-2 rounded-lg hover:bg-white hover:shadow-md transition"
              >
                Register
              </button>
            </div>
          );
        })}
        {filteredCampaigns.length === 0 && (
          <p className="col-span-full text-center text-gray-400">
            No campaigns found.
          </p>
        )}
      </div>

      {selectedCampaign && !registrationSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-[#152D45] p-8 rounded-xl max-w-lg w-full shadow-xl">
            <h3 className="text-2xl font-bold text-[#2ECC71] mb-6">
              Register for {selectedCampaign.summary}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 rounded bg-[#0A1A2F] text-white"
                required
              />

              {/* Contact Number */}
              <input
                name="contactNo"
                placeholder="Contact No"
                value={formData.contactNo}
                onChange={(e) => {
                  let value = e.target.value.replace(/\D/g, "");
                  if (value.startsWith("0")) value = "+94" + value.substring(1);
                  setFormData({ ...formData, contactNo: value });
                }}
                pattern="\+94\d{9}"
                title="Contact number must be in Sri Lankan format: +947XXXXXXXX"
                maxLength={12}
                className="w-full p-2 rounded bg-[#0A1A2F] text-white"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Enter a valid email address"
                className="w-full p-2 rounded bg-[#0A1A2F] text-white"
                required
              />

              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                min="1"
                max="99"
                className="w-full p-2 rounded bg-[#0A1A2F] text-white"
                required
              />

              <input
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 rounded bg-[#0A1A2F] text-white"
                required
              />

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 rounded bg-[#0A1A2F] text-white"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setSelectedCampaign(null)}
                  className="px-4 py-2 bg-gray-500 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2ECC71] text-[#0A1A2F] font-semibold rounded-lg hover:bg-[#27AE60]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignPage;
