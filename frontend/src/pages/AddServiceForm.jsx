import React, { useState, useEffect } from "react";

const AddServiceForm = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [services, setServices] = useState([]);

  // Fetch services on mount
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services"); // Vite proxy
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const saveService = async (e) => {
    e.preventDefault();

    if (!title || !amount) {
      setMessage(" Please fill out all fields.");
      return;
    }

    //  Validate amount > 0
    if (Number(amount) <= 0) {
      setMessage(" Amount must be greater than 0.");
      return;
    }

    //  Check for duplicate service title (case-insensitive)
    const isDuplicate = services.some(
      (service) => service.title.toLowerCase() === title.toLowerCase()
    );
    if (isDuplicate) {
      setMessage(" Service title already exists.");
      return;
    }

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, amount }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage(` Service "${data.title}" saved successfully!`);
        setTitle("");
        setAmount("");
        fetchServices(); // Refresh table
      } else {
        const errorData = await res.json();
        setMessage(` Error: ${errorData.error}`);
      }
    } catch (err) {
      setMessage(` Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1A2F] text-[#BDC3C7] relative">
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
          <a href="/createbill" className="block hover:text-[#2ECC71]">
            Billing
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-6 flex flex-col items-center space-y-6">
        {/* Form */}
        <div className="bg-[#152D45] p-8 rounded-3xl w-full max-w-md shadow-2xl border border-gray-700">
          <h2 className="text-3xl font-bold mb-6 text-[#2ECC71]">
            Add New Service
          </h2>

          {message && (
            <p
              className={`mb-4 text-sm ${
                message.includes("✅")
                  ? "text-[#2ECC71]"
                  : "text-red-400"
              }`}
            >
              {message}
            </p>
          )}

          <form className="space-y-4" onSubmit={saveService}>
            <input
              type="text"
              placeholder="Service Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#1A2C44] text-[#DCDCDC] border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2ECC71]"
              required
            />

            <input
              type="number"
              placeholder="Amount (Rs.)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1" //  Prevent entering 0 or negative
              className="w-full p-3 rounded-xl bg-[#1A2C44] text-[#DCDCDC] border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2ECC71]"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#2ECC71] hover:bg-[#27AE60] text-[#0A1A2F] font-semibold py-2 px-4 rounded-xl transition"
            >
              Save Service
            </button>
          </form>
        </div>

        {/* Services Table */}
        <div className="bg-[#152D45] p-6 rounded-3xl w-full max-w-2xl shadow-2xl border border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-[#2ECC71]">
            All Services
          </h2>

          {services.length === 0 ? (
            <p className="text-sm text-[#BDC3C7]">No services added yet.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="py-2 px-4 text-[#2ECC71]">Service</th>
                  <th className="py-2 px-4 text-[#2ECC71]">Amount (Rs.)</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service._id} className="border-b border-gray-600">
                    <td className="py-2 px-4">{service.title}</td>
                    <td className="py-2 px-4">{service.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
};

export default AddServiceForm;
