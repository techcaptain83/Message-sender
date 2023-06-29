import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
});


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { currency, amount } = req.body;
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: currency || 'usd',
                        product_data: {
                            name: 'Purchasing chatmaid serial number',
                        },
                        unit_amount: amount, // in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin}/deposit?success=true`,
            cancel_url: `${req.headers.origin}/desposit?success=false`,
        });
        res.status(200).json({ sessionId: session.id, url: session.url });
    }
}