import initStripe from 'stripe';
import { createClient } from "@/utils/supabase/route";

const handler = async (req, res) => {
  const supabase = createClient();
  if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send("You are not authorized to call this API");
  }
  const stripe = initStripe(process.env.STRIPE_SECRET_KEY)

  const customer = await stripe.customers.create({
    email: req.body.record.email,

  })

  await supabase.from('profile').update({
    stripe_customer: customer.id
  }).eq('id', req.body.record.id);

  res.send({ message: `stripe customer created: ${customer.id}` })
};
export default handler;
 