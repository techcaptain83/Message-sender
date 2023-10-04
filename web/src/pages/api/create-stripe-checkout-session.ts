import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { encryptText } from '@/utils';
import { PREMIUM_PRICE, ENTERPRISE_PRICE } from "@/utils/constants";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
});


const constructUrl = ({
    user_id, reason, plan, deposit_id, success, originUrl
}: {
    plan?: "pro" | "enterprise",
    user_id: string;
    reason: "upgrade" | "deposit";
    deposit_id?: string;
    success: boolean;
    originUrl: string
}): string => {
    const url = `${originUrl}/payment?success=${success}&uid=${encryptText(user_id)}&reason=${reason}${reason === "upgrade" && "&plan=" + plan}${reason === "deposit" && "&dep_id=" + deposit_id}`;
    return url;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { deposit_id, currency, amount, user_id, reason, plan } = req.body;
        if (!["upgrade", "deposit"].includes(reason)) {
            return res.status(400).json({ message: "Invalid reason" });
        }
        if (reason && (!plan || !["pro", "enterprise"].includes(plan))) {
            return res.status(400).json({ message: "Invalid plan" });
        }
        if (!amount && !plan) {
            return res.status(400).json({ message: "Invalid amount" });
        }
        if (!deposit_id && !plan) {
            return res.status(400).json({ message: "Invalid deposit id" });
        }

        // create a checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: currency || 'usd',
                        product_data: {
                            name: reason === "upgrade" ? `Upgrade to ${plan === "pro" ? "Premium Plan" : "Enterprise Plan"}` : 'Deposit To your account',
                        },
                        unit_amount: amount ?
                            amount : plan === "pro" ? PREMIUM_PRICE * 100 : ENTERPRISE_PRICE * 100, // in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: constructUrl({
                user_id,
                reason,
                plan,
                deposit_id,
                success: true,
                originUrl: req.headers.origin!
            }),
            cancel_url: constructUrl({
                user_id,
                reason,
                plan,
                deposit_id,
                success: false,
                originUrl: req.headers.origin!
            }),
        });
        res.status(200).json({ sessionId: session.id, url: session.url });
    }
}