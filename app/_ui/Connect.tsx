"use client";

import React, { useState } from "react";
import { loadConnectAndInitialize } from "@stripe/connect-js";
import {
  ConnectPayments,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js";

const fetchClientSecret = async () => {
  // Fetch the AccountSession client secret
  const response = await fetch("/account_session", { method: "POST" });

  if (!response.ok) {
    // Handle errors on the client side here
    const { error } = await response.json();
    console.log("An error occurred: ", error);
    return undefined;
  }

  const data = await response.json();
  return data.client_secret;
};

export default function Connect() {
  const [stripeConnectInstance] = useState(() => {
    return loadConnectAndInitialize({
      // This is your test publishable API key.
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_KEY!,
      fetchClientSecret,
      appearance: {
        overlays: "dialog",
        variables: {
          colorPrimary: "#625afa",
        },
      },
    });
  });

  return (
    <div className="container">
      <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
        <ConnectPayments />
      </ConnectComponentsProvider>
    </div>
  );
}
