import React from "react";

const TestPaymentPage = () => {
  const handlePayNow = () => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://sandbox.payhere.lk/pay/checkout";

    const params = {
      merchant_id: "1232135", // Replace with your sandbox merchant ID
      return_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
      notify_url: "http://localhost:5000/api/payment/notify", // Optional for IPN
      order_id: `TEST-${Date.now()}`, // Unique order ID
      items: "Dental Cleaning",
      currency: "LKR",
      amount: "1500.00",
      first_name: "Test",
      last_name: "Patient",
      email: "test@example.com",
      phone: "0771234567",
    };

    Object.entries(params).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-700">
          Test PayHere Integration
        </h1>
        <p className="mb-6 text-gray-500">
          Click below to pay for a sample Dental Cleaning appointment.
        </p>
        <button
          onClick={handlePayNow}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow"
        >
          Pay Rs. 1500
        </button>
      </div>
    </div>
  );
};

export default TestPaymentPage;
