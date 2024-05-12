import { use } from "react";
import Card from "./_ui/Card";
import Modal from "./_ui/Modal";
import Button from "./_ui/Button";
import Payment from "./_ui/Payment";
import type Stripe from "stripe";

const Products = () => {
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
};

const Customers = () => {
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
};

export default async function Home() {
  return (
    <>
      <div className="z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Products />
      </div>
      <div className="z-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Customers />
      </div>
      <Modal>
        <Payment />
      </Modal>
    </>
  );
}
