import axios from "@/axios.config";
import { IAuthUser } from "@/types";
import useSWR from "swr";

export default function useUsers() {
    const { data, error } = useSWR("/users", async (url) => {
        try {
            const { data } = await axios.get(url);
            return data.users as IAuthUser[];
        } catch (error) {
            console.log(error);
            return [];
        }
    });

    return {
        users: data,
        isLoading: !error && !data,
    };
}