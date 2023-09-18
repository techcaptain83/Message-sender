import axios from "@/axios.config";
import { IAuthUser, IReservation } from "@/types";
import { UIDHASH } from "@/utils/constants";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import useAuth from "./useAuth";
import { useRouter } from "next/router";

export default function useReservations() {
    const router = useRouter();
    const { user, updateUser } = useAuth();
    const [searchingActiveReservation, setSearchingActiveReservation] = useState(false);
    const [gettingReservationsForHour, setGettingReservationsForHour] = useState(false);
    const [creatingReservation, setCreatingReservation] = useState(false)
    const [creatingMultipleReservations, setCreatingMultipleReservations] = useState(false)

    const localstorageUser = typeof localStorage !== "undefined" ? JSON.parse(localStorage.getItem(UIDHASH) || "{}") as IAuthUser : {} as IAuthUser;

    const { data: reservations, error, mutate } = useSWR(`/reservations/user/${user ? user._id : localstorageUser._id}?active=true`, async (url: string) => {
        try {
            const { data } = await axios.get(url);
            return data.reservations as IReservation[];
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong! try again later.");
            return [];
        }
    });

    const searchForActiveReservation = async () => {
        setSearchingActiveReservation(true);
        try {
            const { data } = await axios.get(`/reservations/active/${user ? user._id : localstorageUser._id}`);
            if (data.notFound) {
                return null;
            }
            return data.reservation as IReservation;

        } catch (error) {
            console.log(error);
            return null;
        }
        finally {
            setSearchingActiveReservation(false);
        }
    }


    const getReservationsForHour = async (date: string, hour: string): Promise<IReservation[] | null> => {
        try {
            setGettingReservationsForHour(true);
            const { data } = await axios.get(`/reservations/hour/${date}/${hour}`);
            return data.reservations as IReservation[];
        } catch (error) {
            console.log(error);
            toast.error("something went wrong!");
            return null;
        } finally {
            setGettingReservationsForHour(false);
        }
    }

    const createReservation = async (startsAt: string, endsAt: string) => {
        setCreatingReservation(true);
        try {
            const { data } = await axios.post('/reservations', {
                startsAt, endsAt, userId: user ? user._id : localstorageUser._id
            });
            if (data.success) {
                mutate();
                toast.success("reservation created successfully!");
                updateUser(data.user);

            } else {
                console.log(data);
                toast.error("something went wrong while creating reservation!");
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong while creating reservation!");
        } finally {
            setCreatingReservation(false);
        }
    }

    const createMultipleReservations = async (reservations: { startsAt: string, endsAt: string }[], minutes: number) => {
        setCreatingMultipleReservations(true);
        try {
            const { data } = await axios.post('/reservations/multiple', {
                reservations, userId: user ? user._id : localstorageUser._id,
                minutes
            });
            if (data.success) {
                mutate();
                toast.success("reservations created successfully!");
                updateUser(data.user);
                router.push("/dashboard/reservations");
            } else {
                console.log(data);
                toast.error("something went wrong while creating reservations!");
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong while creating reservations!");
        } finally {
            setCreatingMultipleReservations(false);
        }
    }


    return {
        reservations,
        fetchingReservations: !reservations && !error,
        searchingActiveReservation,
        searchForActiveReservation,
        gettingReservationsForHour,
        getReservationsForHour,
        createReservation,
        creatingReservation,
        creatingMultipleReservations,
        createMultipleReservations
    }

}