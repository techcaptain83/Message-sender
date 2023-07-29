import axios from "@/axios.config";
import { IAuthUser } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

export default function useUsers() {
    const [isUpgrading, setIsUpgrading] = useState(false);
    const [accountBeingUpgraded, setAccountBeingUpgraded] = useState<string | null>(null);
    const { data, error, mutate } = useSWR("/users", async (url) => {
        try {
            const { data } = await axios.get(url);
            return data.users as IAuthUser[];
        } catch (error) {
            console.log(error);
            return [];
        }
    });

    const releasePremiumVersion = async (userId: string) => {
        setIsUpgrading(true);
        setAccountBeingUpgraded(userId);
        try {
            const { data } = await axios.put(`/users/upgrade-to-pro/${userId}?manual=true`);
            if (data.message === "success") {
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


    return {
        users: data,
        isLoading: !error && !data,
        isUpgrading,
        releasePremiumVersion,
        accountBeingUpgraded
    };
}