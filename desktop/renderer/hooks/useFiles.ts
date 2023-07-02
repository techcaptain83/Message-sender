import axios from "axios.config";
import useSWR from "swr";


export default function useFiles() {

    const { data, error, mutate } = useSWR("/files", async (url) => {
        try {
            const { data } = await axios.get(url);
            // return response.data;
            return data.files;

        } catch (error) {
            // return []
            console.log("error occured while fetching from backend : ")
            console.log(error);
        }
    });

    const getFileData = async (fileId: string) => {
        try {
            const { data } = await axios.get(`/files/${fileId}`);
            console.log(data);
        } catch (error) {
            console.log("error occured while fetching from backend : ")
            console.log(error);
        }
    }

    return {
        files: data,
        isFetching: !error && !data,
        error: error,
        getFileData
    };

}