import initStripe from 'stripe';
import { createClient } from "@/utils/supabase/route";
import { NextRequest, NextResponse } from 'next/server';

const POST = async (req, res) => {
  const supabase = createClient(req);
  if (req.url !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send("You are not authorized to call this API");
  };

  const stripe = new initStripe(process.env.STRIPE_SECRET_KEY)

  const customer = await stripe.customers.create({
    email: req.body.record.email,
  })

  await supabase.from('profile').update({
    stripe_customer: customer.id
  }).eq('id', req.body.record.id);

  res.send({ message: `stripe customer created: ${customer.id}` })
};
export default POST;
 