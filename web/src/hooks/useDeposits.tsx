import useSWR from "swr";
import axios from "@/axios.config";
import toast from "react-hot-toast";
import useAuth from "./useAuth";
import { UIDHASH } from "@/utils/constants";
import { IAuthUser, IDeposit } from "@/types";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { showNewDepositModalAtom } from "@/store/atoms";

export default function useDeposits() {
    const { user, updateUser } = useAuth();
    const [creatingDeposit, setCreatingDeposit] = useState(false);
    const [_, setShowDepositModal] = useRecoilState(showNewDepositModalAtom);
    const localstorageUser = JSON.parse(localStorage.getItem(UIDHASH) || "{}") as IAuthUser;

    const { data: allDeposits, error: allDepositsError, mutate: mutateAllDeposits } = useSWR('/deposits', async () => {
        try {
            const { data } = await axios.get('/deposits');
            return data.deposits as IDeposit[];
        } catch (error) {
            console.log(error);
            toast.error("Error fetching deposits! Please try again later.")
            return [];
        }
    });

    const { data: userDeposits, error: userDepositsError, mutate: mutateUserDeposits } = useSWR(`/deposits/user/${user?._id ? user._id : localstorageUser._id}`, async () => {
        try {
            const { data } = await axios.get(`/deposits/user/${user?._id ? user._id : localstorageUser._id}`);
            return data.deposits as IDeposit[];
        } catch (error) {
            console.log(error);
            toast.error("Error fetching your deposits! Please try again later.")
            return [];
        }
    });

    const createDeposit = async (amount: number) => {
        setCreatingDeposit(true);
        try {
            const { data } = await axios.post('/deposits', { amount, userId: user?._id ? user._id : localstorageUser._id });
            userDeposits ? mutateUserDeposits([...userDeposits, data.deposit]) : mutateUserDeposits();
            toast.success("Money deposited to your account successfully!");
            updateUser(data.user);
            setShowDepositModal(false);
        } catch (error) {
            console.log(error);
            toast.error("Error creating deposit! Please try again later.")
        } finally {
            setCreatingDeposit(false);
        }
    };


    return {
        allDeposits,
        allDepositsError,
        fetchingAllDeposits: !allDeposits && !allDepositsError,
        userDeposits,
        userDepositsError,
        fetchingUserDeposits: !userDeposits && !userDepositsError,
        createDeposit,
        creatingDeposit
    }
}