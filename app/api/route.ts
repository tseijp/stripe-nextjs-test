import { NextResponse } from "next/server";
import { Stripe } from "stripe";

const resolver = (product: Stripe.Product) => ({
  id: product.id,
  name: product.name,
  description: product.description,
  images: product.images,
  metadata: product.metadata,
});

export async function GET() {
  const stripe = new Stripe(process.env.NEXT_SECRET_STRIPE_KEY!);
  const products = await stripe.products.list();
  const { data } = products;
  return NextResponse.json(data.map(resolver));
}
