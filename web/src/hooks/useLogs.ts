import { logToDeleteState, selectedFileState, showDeleteLogState } from "@/atoms";
import { ILog } from "@/types";
import axios from "@/axios.config";
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


    const [deletingLog, setDeletingLog] = useState(false);
    const { data, error, mutate } = useSWR(`/logs?user=${user?._id}`, async (url) => {
        try {
            const { data } = await axios.get(url);
            return data.logs as ILog[];

        } catch (error) {
            console.log("error occured while fetching from backend : ")
            console.log(error);
            return [];
        }
    });

    const createLog = async (log: Omit<ILog, "createdAt">) => {
        try {
            const { data } = await axios.post(`/logs?user=${user?._id}`, log);
            if (data.message === "success") {
                // toast.success("Log created successfuly!");
                mutate();
            }
        } catch (error) {
            // toast.error("Error occured while creating log! try again later");
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