import Razorpay from "razorpay";

export async function POST() {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: 9900, // ₹99 in paisa
    currency: "INR",
    receipt: "repayment_schedule",
  };

  const order = await razorpay.orders.create(options);

  return Response.json(order);
}