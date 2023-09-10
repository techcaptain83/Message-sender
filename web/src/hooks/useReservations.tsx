import useSWR from "swr";
import axios from "@/axios.config";
import { IAuthUser, IReservation } from "@/types";
import toast from "react-hot-toast";
import { UIDHASH } from "@/utils/constants";
import useAuth from "./useAuth";


export default function useReservations() {
    const { user } = useAuth();
    
    const localstorageUser = JSON.parse(localStorage.getItem(UIDHASH) || "{}") as IAuthUser;
    const { data, error, mutate } = useSWR('/api/reservations', async (url: string) => {
        try {
            const { data } = await axios.get(`/reservations/user/${user ? user._id : localstorageUser._id}`);
            return data.reservations;
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong! try again later.");
            return [];
        }
    });

    return {

    }

}