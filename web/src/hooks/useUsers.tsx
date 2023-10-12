import axios from "@/axios.config";
import { showAddCredentialsModalAtom } from "@/store/atoms";
import { IAuthUser } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import useSWR from "swr";

export default function useUsers() {
    const [isUpgrading, setIsUpgrading] = useState(false);
    const [addingCredentials, setAddingCredentials] = useState(false);
    const [_, setShowAddCredentials] = useRecoilState(showAddCredentialsModalAtom);

    const [deletingUser, setDeletingUser] = useState<{
        deleting: boolean;
        userId: string
    } | null>(null);
    const [accountBeingUpgraded, setAccountBeingUpgraded] = useState<{
        _id: string,
        plan: "pro" | "enterprise"
    } | null>(null);
    const { data, error, mutate } = useSWR("/users", async (url) => {
        try {
            const { data } = await axios.get(url);
            return data.users as IAuthUser[];
        } catch (error) {
            console.log(error);
            return [];
        }
    });

    const manualUpgrade = async (userId: string, plan: "pro" | "enterprise") => {
        setIsUpgrading(true);
        setAccountBeingUpgraded({
            _id: userId,
            plan
        });
        try {
            const { data } = await axios.put(`/users/upgrade-account/${userId}`, {
                plan, manual: true
            });
            if (data.success) {
                toast.success("This account have been upgraded successfuly!");
                mutate();
            } else {
                toast.error(" There was an error upgrading this account! please contact support!");
            }
        } catch (error) {
            console.log(error);
            toast.error(" There was an error upgrading this account! please contact support!");
        } finally {
            setIsUpgrading(false);
            setAccountBeingUpgraded(null);
        }
    }

    const addApiCredentials = async (userId: string, instanceId: string, token: string) => {
        setAddingCredentials(true);
        try {
            const { data } = await axios.post(`/users/add-api-credentials/${userId}`, { instanceId, token });
            if (data.success) {
                toast.success("Api credentials added successfuly!");
                mutate();
                setShowAddCredentials({ show: false, user: null })
            }
            else {
                toast.error(" There was an error adding this credentials! try again later!")
            }
        } catch (error) {
            console.log(error)
            toast.error(" There was an error adding this credentials! try again later!")
        } finally {
            setAddingCredentials(false);
        }
    }

    const deleteAccount = async (userId: string) => {
        setDeletingUser({
            deleting: true,
            userId
        });
        try {
            const { data } = await axios.delete(`/users/${userId}`);
            if (data.message === "success") {
                toast.success("This account have been deleted successfuly!");
                mutate();
            } else {
                toast.error(" There was an error deleting this account! please contact support!");
            }
        } catch (error) {
            console.log(error);
            toast.error(" There was an error deleting this account! please contact support!");
        } finally {
            setDeletingUser(null);
        }
    }

    return {
        users: data,
        isLoading: !error && !data,
        isUpgrading,
        manualUpgrade,
        accountBeingUpgraded,
        deletingUser,
        deleteAccount,
        addingCredentials,
        addApiCredentials
    };
}