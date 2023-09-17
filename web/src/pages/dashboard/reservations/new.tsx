import UserDashboardLayout from "@/components/layouts/UserDashboardLayout";
import Head from "next/head";

export default function NewReservation() {
    return (
        <UserDashboardLayout>
            <Head>
                <title>Chatmaid - New Reservation</title>
            </Head>
            <header>
                <div className='space-y-3'>
                    <h1 className="text-xl font-semibold leading-6 text-gray-700">
                        New Reservation
                    </h1>
                    <p className="text-sm leading-6 text-gray-600 max-w-2xl">
                        You can reserve one or more 15-minutes slots from here.
                    </p>
                </div>
            </header>
        </UserDashboardLayout>
    )
}