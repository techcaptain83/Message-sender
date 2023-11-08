import useSWR from "swr";
import axios from "@/axios.config";
import toast from "react-hot-toast";
import useAuth from "./useAuth";
import { UIDHASH } from "@/utils/constants";
import { IAuthUser, IDeposit } from "@/types";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { showNewDepositModalAtom } from "@/store/atoms";
import { useRouter } from "next/router";

export default function useDeposits() {
    const router = useRouter();
    const { user } = useAuth();
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
            (router.pathname === "/dashboard/deposits" && user) &&  toast.error("Error fetching your deposits! Please try again later.")
            return [];
        }
    });

    const createDeposit = async (amount: number): Promise<{
        success: boolean;
        deposit?: IDeposit;
    }> => {
        setCreatingDeposit(true);
        try {
            const { data } = await axios.post('/deposits', { amount, userId: user?._id ? user._id : localstorageUser._id });
            userDeposits ? mutateUserDeposits([...userDeposits, data.deposit]) : mutateUserDeposits();
            toast.success("Payment initialized successfully! redirecting...");
            setShowDepositModal(false);
            return { success: true, deposit: data.deposit };
        } catch (error) {
            console.log(error);
            toast.error("Error initializing deposit! Please try again later.")
            return { success: false };
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