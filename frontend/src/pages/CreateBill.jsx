import React, { useState, useEffect } from "react";

const CreateBill = () => {
  const [contactNo, setContactNo] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [items, setItems] = useState([{ title: "", amount: "" }]);
  const [paid, setPaid] = useState("");
  const [paidError, setPaidError] = useState(""); //  new state
  const [total, setTotal] = useState(0);
  const [balance, setBalance] = useState(0);
  const [services, setServices] = useState([]); // all available services

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];

    if (field === "title") {
      updatedItems[index][field] = value;
      const matchedService = services.find(
        (s) => s.title.toLowerCase() === value.toLowerCase()
      );
      updatedItems[index].amount = matchedService ? matchedService.amount : "";
    } else if (field === "amount") {
      updatedItems[index][field] = Number(value);
    }

    setItems(updatedItems);

    const newTotal = updatedItems.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0
    );
    setTotal(newTotal);
    setBalance(paid ? paid - newTotal : 0);
  };

  const addItem = () => setItems([...items, { title: "", amount: "" }]);

  const handlePaidChange = (value) => {
    const num = Number(value);
    setPaid(num);
    setBalance(num - total);

    // Validation: must be greater than 0
    if (num <= 0) {
      setPaidError("Paid amount must be greater than 0");
    } else {
      setPaidError("");
    }
  };

  const handlePhoneChange = (value) => {
    const cleanedValue = value.replace(/\D/g, "");
    setContactNo(cleanedValue);

    const phonePattern = /^07\d{8}$/;
    setPhoneError(
      cleanedValue && !phonePattern.test(cleanedValue)
        ? "Enter a valid Sri Lankan number (07XXXXXXXX)"
        : ""
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Prevent submission if validation fails
    if (phoneError || contactNo.length !== 10) {
      setPhoneError("Enter a valid Sri Lankan number (07XXXXXXXX)");
      return;
    }
    if (paid <= 0) {
      setPaidError("Paid amount must be greater than 0");
      return;
    }

    const res = await fetch("/api/bills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contactNo, items, total, paid, balance }),
    });
    const data = await res.json();

    if (data.success) {
      alert("Bill created & saved successfully!");
      setContactNo("");
      setItems([{ title: "", amount: "" }]);
      setPaid("");
      setTotal(0);
      setBalance(0);
      setPaidError("");
    } else {
      alert("Error creating bill");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1A2F] text-[#BDC3C7] p-6">
      <h1 className="text-2xl font-bold mb-4">Create Bill</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#152D45] p-6 rounded-lg shadow-lg max-w-2xl mx-auto"
      >
        {/* Contact Number */}
        <div className="mb-4">
          <label className="block mb-2">Patient Contact No</label>
          <input
            type="text"
            value={contactNo}
            onChange={(e) => handlePhoneChange(e.target.value)}
            className={`w-full p-2 rounded bg-[#0A1A2F] text-white ${
              phoneError ? "border border-red-500" : ""
            }`}
            required
            placeholder="07XXXXXXXX"
            maxLength={10}
          />
          {phoneError && (
            <p className="text-red-500 text-sm mt-1">{phoneError}</p>
          )}
        </div>

        {/* Bill Items */}
        {items.map((item, index) => (
          <div key={index} className="flex gap-4 mb-4">
            <input
              type="text"
              placeholder="Item Title"
              value={item.title}
              onChange={(e) =>
                handleItemChange(index, "title", e.target.value)
              }
              list="service-list"
              className="flex-1 p-2 rounded bg-[#0A1A2F] text-white"
              required
            />
            <datalist id="service-list">
              {services.map((s) => (
                <option key={s._id} value={s.title} />
              ))}
            </datalist>

            <input
              type="number"
              placeholder="Amount"
              value={item.amount}
              onChange={(e) =>
                handleItemChange(index, "amount", e.target.value)
              }
              className="w-32 p-2 rounded bg-[#0A1A2F] text-white"
              required
            />
          </div>
        ))}

        <button
          type="button"
          onClick={addItem}
          className="mb-4 bg-[#2ECC71] text-white px-4 py-2 rounded"
        >
          + Add Item
        </button>

        {/* Payment Section */}
        <div className="mb-4">
          <label className="block mb-2">Amount Paid</label>
          <input
            type="number"
            value={paid}
            onChange={(e) => handlePaidChange(e.target.value)}
            className={`w-full p-2 rounded bg-[#0A1A2F] text-white ${
              paidError ? "border border-red-500" : ""
            }`}
            required
          />
          {paidError && <p className="text-red-500 text-sm mt-1">{paidError}</p>}
        </div>

        {/* Summary */}
        <div className="bg-[#1A2C44] p-4 rounded mb-4">
          <p>
            Total: <span className="font-bold">Rs.{total}</span>
          </p>
          <p>
            Paid: <span className="font-bold">Rs.{paid}</span>
          </p>
          <p>
            Balance: <span className="font-bold">Rs.{balance}</span>
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-[#2ECC71] text-white px-6 py-2 rounded hover:bg-[#27AE60] transition"
        >
          Generate Bill
        </button>
      </form>
    </div>
  );
};

export default CreateBill;
