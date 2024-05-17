import { use } from "react";
import Card from "@/app/_ui/Card";
import Button from "@/app/_ui/Button";
import type Stripe from "stripe";

export default function Products() {
  const res = fetch("http://localhost:3000/api/products");
  const products = use(res.then((res) => res.json())) as Stripe.Product[];

  return (
    <>
      {products.map((product) => (
        <Card key={product.id} target={product}>
          <img src={product.images[0]} alt={product.name} />
          <Button href={`?id=${product.id}`}>Pay</Button>
        </Card>
      ))}
    </>
  );
}
