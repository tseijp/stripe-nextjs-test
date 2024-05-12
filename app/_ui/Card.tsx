import type Stripe from "stripe";

type Props = {
  target: Stripe.Product | Stripe.Customer;
  children?: React.ReactNode;
};

export default function Card(props: Props) {
  const { target, children } = props;
  const { name, description } = target;

  return (
    <div className="flex flex-col items-center gap-4 p-4 border-[1px] rounded">
      <div className="w-full ml-4">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      {children}
    </div>
  );
}
