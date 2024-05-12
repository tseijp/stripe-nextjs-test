"use client";

import { useSearchParams } from "next/navigation";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import type StripeJS from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

const options: StripeJS.StripeElementsOptions = {
  mode: "payment",
  amount: 1099,
  currency: "usd",
};

type Props = {
  children?: React.ReactNode;
};

const useModalIsDisplay = () => {
  const searchParams = useSearchParams();
  return !!searchParams.get("id");
};

const useHandleClickOverlay = () => {
  const handleClickOverlay = () => {
    window.history.replaceState(null, "", "/");
  };
  return handleClickOverlay;
};

export default function Modal(props: Props) {
  const { children } = props;
  const isDisplay = useModalIsDisplay();
  const handleClickOverlay = useHandleClickOverlay();
  const handleClickContainer = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <div
        onClick={handleClickOverlay}
        className={`fixed flex z-50 top-0 left-0 w-full h-[100dvh] duration-500 bg-transparent backdrop-filter backdrop-blur-lg ${
          isDisplay ? "overlay-visible" : "overlay-hidden"
        }`}
      >
        <div
          onClick={handleClickContainer}
          className={`lg:w-[50%] w-[95%] h-[95dvh] m-auto p-16 bg-gray-800 rounded-l-[4rem] duration-500 text-white ${
            isDisplay ? "container-visible" : "container-hidden"
          }`}
        >
          {isDisplay && children}
        </div>
      </div>
    </Elements>
  );
}
