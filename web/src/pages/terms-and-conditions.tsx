import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import Head from 'next/head';
import React from 'react';

const termsAndConditionsContent = [
    {
        title: 'Usage Agreement:',
        content: 'The Software is provided strictly for personal use and is intended for use with small contact lists. Misuse of the Software, including but not limited to the use with very large contact lists or any use that might categorize the user as a spammer, is strictly prohibited. Users must not use the Software for any unlawful, unethical, or improper activities. Any actions that contravene these Terms can lead to immediate termination of access to the Software, without any liability to ChatMaid. Any consequences arising from being categorized as a spammer will be the sole responsibility of the user.',
    },
    {
        title: 'Disclaimer of Liability:',
        content: 'ChatMaid, its affiliates, and its employees assume no responsibility or liability for any misuse of the Software. Users are solely responsible for their actions and the consequences thereof when using the Software. In no event will ChatMaid be liable for any indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profits, even if ChatMaid has been advised of the possibility of such damages.',
    },
    {
        title: 'Third-Party Applications:',
        content: 'The Software is designed to interface with WhatsApp. However, ChatMaid is not affiliated with, endorsed by, or in any way officially connected with WhatsApp. We make no representations, warranties, or guarantees as to the continuous compatibility of the Software with WhatsApp. ChatMaid assumes no responsibility or liability for any issues, loss, or damage that may occur as a result of using WhatsApp or any changes or modifications to its policies or terms of use that may affect the functionality of our Software.',
    },
    {
        title: 'Service Availability:',
        content: 'ChatMaid does not guarantee the availability or uninterrupted operation of the Software. There may be instances when the Software is unavailable due to factors beyond our control, including but not limited to technical issues, system maintenance, or force majeure events. ChatMaid shall not be liable for any damages or losses as a result of such unavailability.',
    },
    {
        title: 'Non-Refundable Payment:',
        content: 'All payments made for the Software are non-refundable. Once the Software has been delivered to the user, no refunds will be issued, regardless of the circumstances. By making a payment, you acknowledge and agree that your payment is for the immediate provision of the Software and you waive any rights to a "cooling off" period or to cancel the purchase for any reason.',
    },
    {
        title: 'Intellectual Property:',
        content: 'The Software and all content included therein, including but not limited to text, design, graphics, interfaces, and code, and the selection and arrangements thereof, is owned by ChatMaid. Users do not acquire any ownership rights by using the Software.',
    },
    {
        title: 'Changes to These Terms:',
        content: 'ChatMaid reserves the right, at its sole discretion, to modify, add, or remove portions of these Terms at any time. It is your responsibility to check these Terms periodically for changes. Your continued use of the Software following the posting of changes will mean that you accept and agree to the changes.',
    },
];

export default function TermsAndConditions() {
    return (
        <>
            <Head>
                <title>Chatmaid - Terms and conditions</title>
                <meta
                    name="description"
                    content="Most WhatsApp providers are accurate, but hard to use. We make the opposite trade-off, and hope you don’t get lost."
                />
            </Head>
            <Header />
            <main className="flex flex-col items-center gap-4 justify-center min-h-screen">
                <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
                <div className="max-w-4xl p-6 bg-slate-50/50 rounded-md shadow-sm  mb-8">
                    {termsAndConditionsContent.map((section, index) => (
                        <div key={index} className="mb-4 space-y-2">
                            <h2 className="font-bold">{section.title}</h2>
                            <p>{section.content}</p>
                        </div>
                    ))}
                    <div className='space-y-4 pt-5'>
                        <p>
                            By downloading or using the Software, you agree to adhere to these Terms.
                            If you disagree with any part of the Terms, you must refrain from using the Software.
                        </p>
                        <p>
                            Please note that violation of these Terms can result in legal action, the blocking of access to the Software, and/or the deletion of your account.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
