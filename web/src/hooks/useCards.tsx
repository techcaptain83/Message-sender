import useSWR from "swr";
import axios from "@/axios.config";
import useAuth from "./useAuth";
import { IAuthUser, ICard } from "@/types";
import toast from "react-hot-toast";
import { UIDHASH } from "@/utils/constants";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { showCreateCardModalAtom } from "@/store/atoms";

export default function useCards() {
    const { user } = useAuth();
    const [creatingCard, setCreatingCard] = useState(false);
    const [_show, setShow] = useRecoilState(showCreateCardModalAtom);

    const localstorageUser = typeof localStorage !== "undefined" ? JSON.parse(localStorage.getItem(UIDHASH) || "{}") as IAuthUser : {} as IAuthUser;

    const { data: cards, error, mutate } = useSWR(`/cards/${user ? user._id : localstorageUser._id}`, async (url: string) => {
        try {
            const { data } = await axios.get(url);
            if (data.success) {
                return data.cards as ICard[];
            }
            toast.error("something went wrong!");
            return [];
        } catch (error) {
            toast.error("something went wrong! try again later!");
            console.log(error);
            return [];
        }
    });


    /*
 
    */
    const createCard = async (card: ICard, closeModal?: boolean) => {
        try {
            setCreatingCard(true);
            const { data } = await axios.post(`/cards/${user ? user._id : localstorageUser._id}`, card);
            if (data.success) {
                mutate();
                toast.success("card created successfully!");
                closeModal && setShow(false);
                return data.card as ICard;
            }
            toast.error("something went wrong!");
            return null;
        } catch (error) {
            console.log(error);
            toast.error("something went wrong! try again later!");
        } finally {
            setCreatingCard(false);
        }
    }


    return {
        cards,
        fetchingCards: !cards && !error,
        creatingCard,
        createCard
    }
}