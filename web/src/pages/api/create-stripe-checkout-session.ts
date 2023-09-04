import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { encryptText } from '@/utils';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
});


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { deposit_id, currency, amount, user_id,product_name } = req.body;

        // create a checkout session
        const session = await stripe.checkout.sessions.create({
            // method types: google pay, apple pay, card,weChat pay
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: currency || 'usd',
                        product_data: {
                            name: product_name,
                        },
                        unit_amount: amount, // in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.origin}/deposit?success=1&dp_id=${deposit_id}&uid=${encryptText(user_id)}`,
            cancel_url: `${req.headers.origin}/deposit?success=0&dp_id=${deposit_id}&uid=${encryptText(user_id)}`,
        });
        res.status(200).json({ sessionId: session.id, url: session.url });
    }
}