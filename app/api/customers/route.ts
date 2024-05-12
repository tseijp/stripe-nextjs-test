import { NextResponse } from "next/server";
import { Stripe } from "stripe";

const resolver = (customer: Stripe.Customer) => ({
  id: customer.id,
  name: customer.name,
  description: customer.description,
  metadata: customer.metadata,
});

export async function GET() {
  const stripe = new Stripe(process.env.NEXT_SECRET_STRIPE_KEY!);
  const customers = await stripe.customers.list();
  const { data } = customers;
  return NextResponse.json(data.map(resolver));
}
