import { use } from "react";

const Products = () => {
  const res = fetch("http://localhost:3000/api/").then((res) => res.json());
  const products = use(res) as any[];

  return (
    <>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <img src={product.images[0]} alt={product.name} />
        </div>
      ))}
    </>
  );
}
export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Products />
      </div>
    </main>
  );
}
