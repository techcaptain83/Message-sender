/* eslint-disable react-hooks/exhaustive-deps */
import { logToDeleteState, selectedFileState, showDeleteLogState } from "@/atoms";
import axios from "@/axios.config";
import { IAuthUser, ILog } from "@/types";
import { UIDHASH } from "@/utils/constants";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import useSWR from "swr";
import useAuth from "./useAuth";


export default function useLogs() {
    const { user } = useAuth();
    const [_showDeleteLog, setShowdeleteLog] = useRecoilState(showDeleteLogState);
    const [_logToDelete, setLogToDelete] = useRecoilState(logToDeleteState);
    const [_, setSelectedFile] = useRecoilState(selectedFileState)

    const localstorageUser = typeof localStorage !== "undefined" ? JSON.parse(localStorage.getItem(UIDHASH) || "{}") as IAuthUser : {} as IAuthUser;
    const [deletingLog, setDeletingLog] = useState(false);
    const { data, error, mutate } = useSWR(`/logs/user/${user?._id ? user._id : localstorageUser._id}`, async (url) => {
        try {
            const { data } = await axios.get(url);
            return data.logs as ILog[];

        } catch (error) {
            console.log(error);
            toast.error("error fetching your history! try again later")
            return [];
        }
    });

    const createLog = async (log: Omit<ILog, "createdAt">) => {
        const localstorageUser = JSON.parse(localStorage.getItem(UIDHASH) || "{}") as IAuthUser;
        try {
            const { data } = await axios.post(`/logs?user=${user?._id ? user._id : localstorageUser._id}`, log);
            if (data.message === "success") {
                mutate();
            }
        } catch (error) {
            console.log("error occured while creating log");
            console.log(error);
        }
    }

    const deleteLog = async (logId?: string) => {
        if (!logId) return;
        setDeletingLog(true);
        try {
            const { data } = await axios.delete(`/logs/${logId}`);
            if (data.message === "success") {
                toast.success("Log deleted successfuly!");
                setLogToDelete(null);
                setShowdeleteLog(false);
                setSelectedFile(null);
                mutate();
            }
        } catch (error) {
            toast.error("Error occured while deleting log! try again later");
            console.log("error occured while deleting file");
            console.log(error);
        } finally {
            setDeletingLog(false);
        }
    }

    return {
        logs: data,
        isFetching: !error && !data,
        deletingLog,
        deleteLog,
        createLog
    }
}