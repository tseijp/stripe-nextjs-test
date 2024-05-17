import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_SECRET_SPRITE_KEY!);

export async function POST() {
  try {
    const accountSession = await stripe.accountSessions.create({
      account: process.env.CONNECTED_ACCOUNT_ID!,
      components: {
        payments: {
          enabled: true,
          features: {
            refund_management: true,
            dispute_management: true,
            capture_payments: true,
          },
        },
      },
    });
    return NextResponse.json({
      client_secret: accountSession.client_secret,
    });
  } catch(error) {
    console.log(error)
    return NextResponse.json(
      { message: `api/products Error: ${error}` },
      { status: 500 }
    );
  }
}

// const app = express();
// app.post("/account_session", async (req, res) => {
//   try {
//     const accountSession = await stripe.accountSessions.create({
//       account: "{{CONNECTED_ACCOUNT_ID}}",
//       components: {
//         payments: {
//           enabled: true,
//           features: {
//             refund_management: true,
//             dispute_management: true,
//             capture_payments: true,
//           },
//         },
//       },
//     });

//     res.json({
//       client_secret: accountSession.client_secret,
//     });
//   } catch (error) {
//     console.error(
//       "An error occurred when calling the Stripe API to create an account session",
//       error
//     );
//     res.status(500);
//     res.send({ error: error.message });
//   }
// });

// app.listen(3000, () => {
//   console.log("Running on port 3000");
// });
