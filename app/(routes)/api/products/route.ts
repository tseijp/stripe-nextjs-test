import { NextResponse } from "next/server";
import { Stripe } from "stripe";

const resolver = (product: Stripe.Product) => ({
  id: product.id,
  name: product.name,
  description: product.description,
  images: product.images,
  metadata: product.metadata,
});

const stripe = new Stripe(process.env.NEXT_SECRET_STRIPE_KEY!);

export async function GET() {
  const products = await stripe.products.list();
  const { data } = products;
  return NextResponse.json(data.map(resolver));
}

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature")!;
  if (!signature)
    return NextResponse.json(
      { message: "Invalid signature." },
      { status: 500 }
    );

  try {
    const body = await request.arrayBuffer();
    const event = stripe.webhooks.constructEvent(
      Buffer.from(body),
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    const isPaymentFailed =
      event.type === "checkout.session.async_payment_failed";
    const isPaymentSuccess =
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.async_payment_succeeded";

    if (!isPaymentSuccess || isPaymentFailed)
      return NextResponse.json({ message: `Payment failed!` }, { status: 400 });

    const eventDataObject = event.data.object as Stripe.Checkout.Session;
    const isPaid = eventDataObject.payment_status === "paid";

    if (isPaid) {
      const customerDetails = eventDataObject.customer_details;
      console.log({
        name: customerDetails?.name,
        address: customerDetails?.address,
        email: customerDetails?.email,
        phone: customerDetails?.phone,
        amount_total: eventDataObject.amount_total,
        currency: eventDataObject.currency,
      });

      const { data: cartItems } = await stripe.checkout.sessions.listLineItems(
        eventDataObject.id,
        { expand: ["data.price.product"] }
      );

      cartItems.forEach((item) => {
        const product = item.price?.product as Stripe.Product;
        console.log({
          product: product.name,
          unit_amount: item.price?.unit_amount,
          currency: item.price?.currency,
          quantity: item.quantity,
          amount_total: item.amount_total,
        });
      });
    }

    return NextResponse.json({ message: `Payment success!` }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: `api/products Error: ${error}` },
      { status: 500 }
    );
  }
}
