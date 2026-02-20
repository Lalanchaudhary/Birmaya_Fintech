import crypto from "crypto";
async function sendWhatsAppMessage(phone) {
    await fetch(
        `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messaging_product: "whatsapp",
                to: phone,
                type: "text",
                text: {
                    body: `Thank you for your ₹99 payment.
                    
Our expert will connect with you shortly for your detailed Repayment Schedule.`,
                },
            }),
        }
    );
}

export async function POST(req) {
    const body = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
        .update(body)
        .digest("hex");

    if (signature !== expectedSignature) {
        return new Response("Invalid signature", { status: 400 });
    }

    const event = JSON.parse(body);

    if (event.event === "payment.captured") {
        const phoneNumber = "91XXXXXXXXXX"; // Replace with actual user number

        await sendWhatsAppMessage(phoneNumber);
    }

    return new Response("OK", { status: 200 });
}