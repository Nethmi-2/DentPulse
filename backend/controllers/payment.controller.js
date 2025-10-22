import crypto from "crypto";

export const createPayment = (req, res) => {
  const { order_id, treatment, amount, first_name, last_name, email, phone } = req.body;

  const merchant_id = process.env.PAYHERE_MERCHANT_ID;
  const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET;

  const return_url = "http://localhost:3000/payment-success";
  const cancel_url = "http://localhost:3000/payment-cancel";
  const notify_url = "http://localhost:5000/api/payment/notify";

  // Hash generation
  const md5MerchantSecret = crypto.createHash("md5").update(merchant_secret).digest("hex").toUpperCase();
  const hash = crypto
    .createHash("md5")
    .update(merchant_id + order_id + amount + "LKR" + md5MerchantSecret)
    .digest("hex")
    .toUpperCase();

  const paymentData = {
    sandbox: true,
    merchant_id,
    return_url,
    cancel_url,
    notify_url,
    order_id,
    items: treatment,
    amount,
    currency: "LKR",
    first_name,
    last_name,
    email,
    phone,
    hash,
  };

  res.json(paymentData);
};
