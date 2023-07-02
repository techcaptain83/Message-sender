import { getDecodedFileData } from "@/utils/files";
import axios from "axios.config";
import { useState } from "react";
import useSWR from "swr";


export default function useFiles() {
    const [gettingFileData, setGettingFileData] = useState(false);

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
        setGettingFileData(true);
        try {
            const { data } = await axios.get(`/files/${fileId}`);
            if (data.file) {
                const decodedData = getDecodedFileData(data.file.data);
                const fileReader = new FileReader();
                fileReader.onload = (event) => {
                    const fileContents = event.target.result;
                    
                
                };
                fileReader.readAsText(decodedData);
            }
        } catch (error) {
            console.log("error occured while fetching from backend : ")
            console.log(error);
        } finally {
            setGettingFileData(false)
        }
    }

    return {
        files: data,
        isFetching: !error && !data,
        error: error,
        getFileData,
        gettingFileData
    };

}