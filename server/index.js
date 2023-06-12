const express = require("express");
const app = express();
const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51NH3ilIs3daH4HlpP2Rs6WoR5P1nLO1MWpAuRD9pXrVkH7nZpzfrwp0EI5PlHfEZjzBuAb3fGKwTJq5rUKkWDLeF00Yb7o7r9E"
);

app.use(express.json());
app.use(cors());

const YOUR_DOMAIN_URL = "https://localhost:3000";

const PORT = 4242;

// Generate Price ID endpoint
app.post("/api/generate-priceID", async (req, res) => {
  try {
    const { price, quantity, shipcost } = req.body;

    // Create a price in Stripe
    const product = await stripe.products.create({
      name: `Shipping Cost: ${shipcost}`,
      unit_label: quantity,
    });

    const priceObj = await stripe.prices.create({
      unit_amount: price * 100, // Price in cents
      currency: "usd",
      product: product.id,
    });

    res.json({ priceId: priceObj.id });
  } catch (error) {
    console.error("Failed to generate Price ID:", error);
    res.status(500).json({ error: "Failed to generate Price ID" });
  }
});

// Create Checkout Session endpoint
app.post("/api/create-checkout", async (req, res) => {
  try {
    const { priceId, quantity } = req.body;

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/CheckOutSuccess`,
      cancel_url: `http://localhost:3000/Failure`,
    });
    

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Failed to create Checkout Session:", error);
    res.status(500).json({ error: "Failed to create Checkout Session" });
  }
});

app.listen(PORT, () => {
  console.log("Stripe Payment Server Running On: ", PORT);
});
