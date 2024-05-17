import { use } from "react";
import Card from "@/app/_ui/Card";
import Button from "@/app/_ui/Button";
import type Stripe from "stripe";

export default function Customers() {
  const res = fetch("http://localhost:3000/api/customers");
  const customers = use(res.then((res) => res.json())) as Stripe.Customer[];

  return (
    <>
      {customers.map((customer) => (
        <Card key={customer.id} target={customer}>
          <Button href={`?id=${customer.id}`}>Pay</Button>
        </Card>
      ))}
    </>
  );
}
