import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, amount, userAddress, longUserAddress } = body;

  if (!name || !email || !amount || !userAddress || !longUserAddress) {
    return new Response(
      JSON.stringify({ error: "Enter a valid field", status: 400 })
    );
  }

  let customer;

  const existingCustomer = await stripe.customers.list({ email });

  if (existingCustomer.data.length > 0) {
    customer = existingCustomer.data[0];
  } else {
    const newCustomer = await stripe.customers.create({
      name,
      email,
    });
    customer = newCustomer;
  }

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2023-08-16" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(amount) * 100,
    currency: "usd",
    customer: customer.id,
    description: "Test payments for uber-clone mobile app",
    shipping: {
      name,
      address: {
        line1: longUserAddress.formattedAddress,
        postal_code: longUserAddress.postalCode,
        city: longUserAddress.city,
        state: longUserAddress.region,
        country: longUserAddress.country,
      },
    },
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: "never",
    },
  });

  console.log({ paymentIntent });

  return new Response(
    JSON.stringify({
      paymentIntent: paymentIntent,
      ephemeralKey: ephemeralKey,
      customer: customer.id,
    })
  );
}
