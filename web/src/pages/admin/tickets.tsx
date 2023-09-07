/* eslint-disable react-hooks/exhaustive-deps */
import AdminDashboardLayout from "@/components/layouts/AdminDashboardLayout";
import EmptyState from "@/components/states/EmptyState";
import LoadingState from "@/components/states/LoadingState";
import TicketsTable from "@/components/tickets/ticketsTable";
import useTickets from "@/hooks/useTickets";
import { ITicket } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Tickets() {
    const { tickets, isLoading } = useTickets();
    const [ticketsToShow, setTicketsToShow] = useState<ITicket[]>([]);
    const [showOnlyPending, setShowOnlyPending] = useState(false);

    useEffect(() => {
        tickets && setTicketsToShow(tickets);
    }, [tickets]);

    useEffect(() => {
        if (showOnlyPending) {
            tickets && setTicketsToShow(tickets.filter(ticket => !ticket.response));
        } else {
            tickets && setTicketsToShow(tickets);
        }
    }, [showOnlyPending]);

    return (
        <AdminDashboardLayout>
            <div className="">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto px-5">
                        <h1 className="text-base font-semibold leading-6 text-gray-900">Tickets</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all tickets submitted by different users.
                        </p>
                    </div>
                </div>
                {(tickets && tickets.length > 0) && (<TicketsTable tickets={tickets} />)}
                {tickets?.length === 0 && <EmptyState message="No Tickets submitted yet!" />}
                {isLoading && <LoadingState message="Loading tickets ..." />}
            </div>
        </AdminDashboardLayout>
    )
}