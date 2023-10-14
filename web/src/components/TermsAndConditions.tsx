import Image from 'next/image'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'

const termsAndConditionsContent: {
    title: string, content: string | string[]
}[] = [
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
            title: "Pricing & Plans",
            content: [`
        We provide 3 plans. free plan, shared premium plan, and exclusive enterprise plan.` ,`for free plan, we give you are limited to only uploading upto 20 contacts and only 15 minutes you can use to send messages. `, `for enterprise plan, you pay $99.99/month or $999.99/year and you get the whole system to yourself where we get you a unique API keys for your specific account.`,
                `Terms and Conditions for the Share Premium Version: `,
                ` The shared premium version of ChatMaid, available on the chatmaid.net website, offers a comprehensive messaging solution with flexible options for users. Here's a breakdown of the features and pricing structure:`,
                ` Subscription Cost: The subscription for the shared premium version of ChatMaid is priced at $79.99 per account.
        Included Messaging Time: With this subscription, users receive 2 hours of messaging time per month.This time can be utilized to send as many messages as they want.`,
                `Reservation Process: Users have the flexibility to schedule their messaging sessions using a calendar.They can choose specific time slots for messaging, with each time slot being 15 minutes long.These time slots are reserved in advance to ensure availability.`,
                `Calendar Booking: Users can select and reserve time slots from the calendar to secure their messaging sessions.The available time slots are divided into 15 - minute blocks, allowing users to plan their messaging activities efficiently.`,
                `Additional Reservations: In addition to the included 2 hours, users have the option to reserve up to 4 extra hours per day by paying an additional fee.This fee amounts to $2.50 for each 15-minute block of reservation.`,
                `Advanced Booking: Users can reserve time slots up to one month in advance.If they wish to plan even further ahead, they can choose to book time slots up to 6 months in advance.For this extended booking window, an extra charge of $2.50 per 15-minute block applies.`,
                `Usage of Included Hours: It's important to note that the 2 hours of messaging time included in the subscription are not cumulative. This means that unused hours do not roll over to the next month. Any unused hours from the current month will expire, and a fresh 2-hour allowance will be provided for the upcoming month.`,
                `Terms of Changes: It's important to note that ChatMaid reserves the right to change the reservation process, prices, or time without advance notification to the users. Please be aware that these changes may occur at any point, and users are encouraged to review the terms periodically.`]
        },
        {
            title: 'Changes to These Terms:',
            content: 'ChatMaid reserves the right, at its sole discretion, to modify, add, or remove portions of these Terms at any time. It is your responsibility to check these Terms periodically for changes. Your continued use of the Software following the posting of changes will mean that you accept and agree to the changes.',
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
