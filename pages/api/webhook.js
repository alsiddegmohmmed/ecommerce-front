import { mongooseConnect } from "@/lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK);
import { buffer } from 'micro';
import { Order } from "@/models/Order";

const endpointSecret = "whsec_248099500dcf3ae50dcf6902ee238c1d9fb400b3b1c1fa806cf771187b187d28";

export default async function handler(req, res) {
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      console.log(`Received checkout.session.completed event: ${JSON.stringify(data)}`);
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      console.log(`Processing order: ${orderId}, paid status: ${paid}`); // Add this line for logging
      if (orderId && paid) {
        try {
          const updatedOrder = await Order.findByIdAndUpdate(orderId, { paid: true }, { new: true });
          if (!updatedOrder) {
            console.error(`Order with ID ${orderId} not found`);
          } else {
            console.log(`Order updated: ${updatedOrder}`);
          }
        } catch (error) {
          console.error(`Failed to update order: ${error.message}`);
        }
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  

  res.status(200).send('ok');
}

export const config = {
  api: { bodyParser: false }
};
