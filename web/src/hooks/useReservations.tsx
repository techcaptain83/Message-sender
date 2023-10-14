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
    const [creatingMultipleReservations, setCreatingMultipleReservations] = useState(false);
    const [deletingReservation, setDeletingReservation] = useState<{
        deleting: boolean,
        reservationId: string;
    } | null>(null);

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
            // const testReservation = {
            //     startsAt: "2023-10-05T01:45:00.000+00:00",
            //     endsAt: "2023-10-05T01:59:59.999+00:00"
            // }
            // find duplicates
            const duplicates = reservations.filter((reservation, index) => {
                const firstIndex = reservations.findIndex(res => res.startsAt === reservation.startsAt && res.endsAt === reservation.endsAt);
                return firstIndex !== index;
            });
            if (duplicates.length) {
                toast.error("you can't create duplicate reservations!");
                return;
            }

            const { data } = await axios.post('/reservations/multiple', {
                reservations,
                userId: user ? user._id : localstorageUser._id,
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
        } catch ({ response }: any) {
            console.log(response);
            if (response?.data?.alreadyReserved) {
                toast.error("one or more reservations are already taken!");
                setTimeout(() => {
                    toast.error(`taken reservation : ${new Date(response.data.reservation.startsAt).toLocaleString()} - ${new Date(response.data.reservation.endsAt).toLocaleString()}`)
                }, 500)
            } else {
                toast.error("something went wrong while creating reservations!");
            }
        } finally {
            setCreatingMultipleReservations(false);
        }
    }

    const deleteReservation = async (reservationId: string) => {
        setDeletingReservation({
            deleting: true,
            reservationId
        });
        try {
            const { data } = await axios.delete(`/reservations/${reservationId}`);
            if (data.success) {
                toast.success("reservation deleted successfully!");
                updateUser(data.user);
                mutate();
            } else {
                toast.error("something went wrong while deleting reservation!");
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong while deleting reservation!");
        } finally {
            setDeletingReservation(null);
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
        createMultipleReservations,
        deleteReservation,
        deletingReservation
    }

}