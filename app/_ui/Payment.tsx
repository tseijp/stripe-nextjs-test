"use client";

import React from "react";
import { PaymentElement } from "@stripe/react-stripe-js";

export default function Payment() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.history.replaceState(null, "", "/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="py-16 flex flex-col h-full justify-around"
    >
      <h2 className="text-center">
        <span className="text-2xl font-bold">Payment</span>
      </h2>
      <div className="flex flex-col justify-center min-h-[75%]">
        <PaymentElement />
      </div>
      <button className="mt-8 w-full h-16 leading-8 bg-gray-200 rounded-full">
        <span className="text-black ">Submit</span>
      </button>
    </form>
  );
}
