import axios from "@/axios.config";
import { ITicket } from "@/types";
import useSWR from "swr";
import useAuth from "./useAuth";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { showAnswerTicketModalAtom, showCreateTicketModalAtom } from "@/store/atoms";

export default function useTickets() {
    const [_, setShowCreateTicketModal] = useRecoilState(showCreateTicketModalAtom);
    const { user } = useAuth();
    const [creatingTicket, setCreatingTicket] = useState(false);
    const [closingTicket, setClosingTicket] = useState<{
        closing: boolean,
        ticketId: string
    }>({ closing: false, ticketId: '' });
    const [submittingResponse, setSubmittingResponse] = useState(false);
    const [_s, setShowAnswerTicket] = useRecoilState(showAnswerTicketModalAtom);
    const { data, error, mutate } = useSWR("/tickets?pending=true", async (url) => {
        try {
            const { data } = await axios.get(url);
            console.log(data)
            return data.tickets as ITicket[];
        } catch (error) {
            console.log(error);
            return [];
        }
    });

    const { data: userTickets, error: userTicketsError, mutate: userTicketsMutate } = useSWR(`/tickets?user=${user?._id}`, async (url) => {
        try {
            const { data } = await axios.get(url);
            return data.tickets as ITicket[];
        } catch (error) {
            console.log(error);
            return [];
        }
    });

    const createTicket = async (title: string, body: string) => {
        setCreatingTicket(true)
        try {
            const response = await axios.post(`/tickets?user=${user?._id}`, {
                title,
                body,
            });
            if (response.status === 201) {
                toast.success("Ticket created successfully!")
                setShowCreateTicketModal(false);
                // mutate();
                userTicketsMutate();
            } else {
                toast.error("Error creating ticket! Please try again later.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error creating ticket! Please try again later.")
            setCreatingTicket(false)
            setShowCreateTicketModal(false);

        } finally {
            setCreatingTicket(false)
        }
    }

    const closeTicket = async (ticketId: string, action: "close" | "reopen") => {
        setClosingTicket({ closing: true, ticketId })
        try {
            const response = await axios.patch(`/tickets/${ticketId}/close`);
            if (response.status === 200) {
                action === "close" ? toast.success("Ticket closed successfully!") : toast.success("Ticket reopened successfully!")

                !user?.isAdmin ? userTicketsMutate() : mutate();
            } else {
                toast.error("Error closing ticket! Please try again later.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error closing ticket! Please try again later.")
        } finally {
            setClosingTicket({ closing: false, ticketId: '' })
        }
    }

    const submitResponse = async (ticketId: string, res: string) => {
        setSubmittingResponse(true)
        try {
            const response = await axios.put(`/tickets/${ticketId}/answer`, {
                response: res
            });
            if (response.status === 200) {
                toast.success("Response submitted successfully!")
                mutate();
                setShowAnswerTicket(null);
            } else {
                toast.error("Error submitting response! Please try again later.");
            }
        } catch (error) {
            console.log(error);
            toast.error("Error submitting response! Please try again later.")
        } finally {
            setSubmittingResponse(false)
        }
    }


    return {
        isLoading: !data && !error,
        tickets: data,
        userTickets,
        userTicketsLoading: !userTickets && !userTicketsError,
        createTicket,
        creatingTicket,
        closingTicket,
        closeTicket,
        submittingResponse,
        submitResponse
    }
}