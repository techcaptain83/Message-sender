import { useState } from "react";
import useSWR from "swr";
import useAuth from "./useAuth";
import axios from "axios.config";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { logToDeleteState, showDeleteLogState } from "@/atoms";
import { ILog } from "@/types";


export default function useLogs() {
    const { user } = useAuth();
    const [_showDeleteLog, setShowdeleteLog] = useRecoilState(showDeleteLogState);
    const [_logToDelete, setLogToDelete] = useRecoilState(logToDeleteState);

    const [deletingLog, setDeletingLog] = useState(false);
    const { data, error, mutate } = useSWR(`/logs?user=${user?._id}`, async (url) => {
        try {
            const { data } = await axios.get(url);
            // return response.data;
            return data.logs as ILog[];

        } catch (error) {
            // return []
            console.log("error occured while fetching from backend : ")
            console.log(error);

            return [];
        }
    });

    const deleteLog = async (logId: string) => {
        setDeletingLog(true);
        try {
            const { data } = await axios.delete(`/logs/${logId}`);
            if (data.success) {
                toast.success("Log deleted successfuly!");
                setLogToDelete(null);
                setShowdeleteLog(false);
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
        deleteLog
    }
}