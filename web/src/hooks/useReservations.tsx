import useSWR from "swr";
import axios from "@/axios.config";
import { IAuthUser, IReservation } from "@/types";
import toast from "react-hot-toast";
import { UIDHASH } from "@/utils/constants";
import useAuth from "./useAuth";
import { useState } from "react";


export default function useReservations() {
    const { user } = useAuth();
    const [searchingActiveReservation, setSearchingActiveReservation] = useState(false);
    const localstorageUser = JSON.parse(localStorage.getItem(UIDHASH) || "{}") as IAuthUser;
    const { data: reservations, error, mutate } = useSWR('/api/reservations', async (url: string) => {
        try {
            const { data } = await axios.get(`/reservations/user/${user ? user._id : localstorageUser._id}`);
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



    return {
        reservations,
        fetchingReservations: !reservations && !error,
        searchingActiveReservation,
        searchForActiveReservation
    }

}