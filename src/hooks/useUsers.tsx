import axios from "@/axios.config";
import { showAddCredentialsModalAtom, showAddMinutesManuallyAtom } from "@/store/atoms";
import { IAuthUser } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import useSWR from "swr";

export default function useUsers() {
    const [isUpgrading, setIsUpgrading] = useState(false);
    const [addingCredentials, setAddingCredentials] = useState(false);
    const [addingMinutesManually, setAddingMinutesManually] = useState(false);
    const [_, setShowAddCredentials] = useRecoilState(showAddCredentialsModalAtom);
    const [_s, setShowAddMinutesManually] = useRecoilState(showAddMinutesManuallyAtom);
    const [verifyingUserManually, setVerifyingUserManually] = useState<{
        verifying: boolean,
        userId: string
    } | null>(null);



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

    /**
     * 
     * @param userId the id of the user you want to add minutes to
     * @param minutes the number of minutes you want to add to the user
     */

    const addMinutesManually = async (userId: string, minutes: number) => {
        setAddingMinutesManually(true);
        try {
            const { data } = await axios.put(`/users/add-minutes/${userId}`, {
                minutes
            });
            if (data.success) {
                toast.success("Minutes Added successfully!");
                setShowAddMinutesManually(null);
            } else {
                console.log(data);
                toast.error("There was a problem adding minutes to this user. please try again later!");
            }
        } catch (error) {
            console.log(error);
            toast.error("There was a problem adding minutes to this user. please try again later!");
        } finally {
            setAddingMinutesManually(false);
        }
    }

    const verifyUserManually = async (userId: string) => {
        setVerifyingUserManually({
            verifying: true,
            userId
        })
        try {
            const { data } = await axios.put(`/users/manual-verification/${userId}`);
            if (data.success) {
                toast.success("user was verified successfully!");
                mutate();
            } else {
                toast.error("Error verifying the user!");
            }
        } catch (error) {
            console.log(error);
            toast.error("there was an error verifying this user! please try again later!");
        }
        finally {
            setVerifyingUserManually(null);
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
        addApiCredentials,
        addingMinutesManually,
        addMinutesManually,
        verifyingUserManually,
        verifyUserManually
    };
}