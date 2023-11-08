import Image from 'next/image'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'

const termsAndConditionsContent: {
    title: string, content: string | string[]
}[] = [
        {
            title: 'Usage Agreement:',
            content: "The Software is intended strictly for personal use and is designed for managing small personal contact lists. Any misuse of the Software, including but not limited to its use with very large contact lists, third party lists, or any activities that may classify the user as a spammer, is strictly prohibited. Users must refrain from using the Software for any unlawful, unethical, or improper purposes. Any actions that contravene these Terms can result in immediate access termination to the Software, without any liability on ChatMaid Inc, LLC's part. Users are solely responsible for any consequences stemming from being categorized as a spammer.",
        },
        {
            title: 'Disclaimer of Liability:',
            content: 'ChatMaid Inc, LLC, its affiliates, and employees bear no responsibility or liability for any misuse of the Software. Users are solely accountable for their actions and the resulting consequences while using the Software. In no event will ChatMaid Inc, LLC be liable for any indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profits, even if ChatMaid Inc, LLC has been made aware of the possibility of such damages.',
        },
        {
            title: 'Third-Party Applications:',
            content: "The Software is designed to interface with WhatsApp. However, ChatMaid Inc, LLC is not affiliated with, endorsed by, or officially connected to WhatsApp in any way. We do not make any representations, warranties, or guarantees regarding the continuous compatibility of the Software with WhatsApp. ChatMaid Inc, LLC assumes no responsibility or liability for any issues, losses, or damages that may arise from using WhatsApp or any changes or modifications to its policies or terms of use that may affect our Software's functionality.",
        },
        {
            title: 'Service Availability:',
            content: 'ChatMaid Inc, LLC cannot guarantee the availability or uninterrupted operation of the Software. There may be instances when the Software becomes unavailable due to factors beyond our control, such as technical issues, system maintenance, or force majeure events. ChatMaid Inc, LLC shall not be liable for any damages or losses resulting from such unavailability.',
        },
        {
            title: 'Non-Refundable Payment:',
            content: 'All payments made for the Software are non-refundable. Once the Software has been delivered to the user, no refunds will be issued, regardless of the circumstances. By making a payment, you acknowledge and agree that your payment is for the immediate provision of the Software, and you waive any rights to a "cooling-off" period or to cancel the purchase for any reason.',
        },
        {
            title: 'Intellectual Property:',
            content: 'The Software and all included content, such as text, design, graphics, interfaces, code, and their arrangement, are owned by ChatMaid Inc, LLC. Users do not acquire any ownership rights through the use of the Software.',
        },
        {
            title: "Pricing & Plans",
            content: [
                'We offer three plans: 1. Free, 2. Shared Premium, 3. Exclusive Enterprise.',
                'For the Free plan, you are limited to uploading up to 20 contacts and can use the system for sending messages for only 15 minutes.',
                'For the Enterprise plan, you pay $99.99 per month or $999.99 per year, and you receive exclusive access to the system with unique API keys for your specific account.'
            ]
        },
        {
            title: "Terms and Conditions for the Shared Premium Version:",
            content: "The shared premium version of ChatMaid Inc, LLC, available on ChatMaid Inc, LLC.net, provides a comprehensive messaging solution with flexible options for users. Here's a breakdown of the features and pricing structure:"
        },
        {
            title: "Subscription Cost:",
            content: "The subscription for the shared premium version of ChatMaid Inc, LLC is priced at $79.99 per account."
        },
        {
            title: "Included Messaging Time:",
            content: "With this subscription, users receive 2 hours of messaging time per month, allowing them to send unlimited messages during this period."
        },
        {
            title: "Reservation Process: ",
            content: "Users can schedule messaging sessions in advance using a calendar. Each time slot is 15 minutes long, and users can reserve specific time slots to ensure availability."
        },
        {
            title: "Calendar Booking:",
            content: "Users can select and reserve time slots from the calendar, which are divided into 15-minute blocks, providing efficient planning for messaging activities."
        },
        {
            title: "Additional Reservations:",
            content: "Users have the option to reserve up to 4 extra hours per day by paying an additional fee, which amounts to $2.50 for each 15-minute block of reservation."
        },
        {
            title: "Advanced Booking:",
            content: "Users can reserve time slots up to one month in advance, with the option to book time slots up to 6 months ahead for an additional charge of $2.50 per 15-minute block."
        },
        {
            title: "Usage of Included Hours:",
            content: "The 2 hours of messaging time included in the subscription are not cumulative. Unused hours do not carry over to the next month; they expire, and a fresh 2-hour allowance is provided for the upcoming month."
        },
        {
            title: "Terms of Changes:",
            content: "ChatMaid Inc, LLC reserves the right to change the reservation process, prices, or time without advance notification to users. These changes may occur at any time, and users are encouraged to periodically review the terms."
        },
        {
            title: 'Changes to These Terms:',
            content: [
                'ChatMaid Inc, LLC Inc, LLC reserves the right, at its sole discretion, to modify, add, or remove portions of these Terms at any time. It is your responsibility to check these Terms periodically for changes. Your continued use of the Software following the posting of changes will indicate your acceptance and agreement to the changes.',
                'By downloading or using the Software, you agree to adhere to these Terms. If you disagree with any part of the Terms, you must refrain from using the Software.',
                'Please note that violating these Terms may result in legal action, access to the Software being blocked, and/or the deletion of your account.'
            ],
        },
    ];


export function TermsAndConditions() {
    return (
        <section
            id="terms-and-conditions"
            aria-labelledby="faq-title"
            className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
        >
            <Image
                className="absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]"
                src={backgroundImage}
                alt=""
                width={1558}
                height={946}
                unoptimized
            />
            <Container className="relative">
                <div className="mx-auto max-w-2xl lg:mx-0 ">
                    <h2
                        id="faq-title"
                        className="font-display text-2xl tracking-tight text-slate-900 sm:text-3xl"
                    >
                        Terms and Conditions
                    </h2>
                </div>

                <div className=" mt-8 text-sm">
                    {termsAndConditionsContent.map((section, index) => (
                        <div key={index} className="mb-4 space-y-2">
                            <h2 className="font-bold">{section.title}</h2>
                            {typeof section.content === "string" ? <p className='text-slate-600'>{section.content}</p> :
                                <div className='space-y-3'>
                                    {
                                        section.content.map((txt, idx) => (
                                            <p key={idx} className='text-slate-600'>{txt}</p>
                                        ))
                                    }
                                </div>
                            }
                        </div>
                    ))}
                    <div className='space-y-4 pt-5 text-slate-600'>
                        <p>
                            By downloading or using the Software, you agree to adhere to these Terms.
                            If you disagree with any part of the Terms, you must refrain from using the Software.
                        </p>
                        <p>
                            Please note that violation of these Terms can result in legal action, the blocking of access to the Software, and/or the deletion of your account.
                        </p>
                    </div>
                </div>
            </Container>
        </section>
    )
}
