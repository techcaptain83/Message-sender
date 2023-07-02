import { showDeleteFileState } from "@/atoms";
import { getDecodedFileData } from "@/utils/files";
import axios from "axios.config";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";
import useSWR from "swr";


export default function useFiles() {
    const [gettingFileData, setGettingFileData] = useState(false);
    const [deletingFile, setDeletingFile] = useState(false);
    const [seletedFile, setSelectedFile] = useRecoilState(showDeleteFileState)

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
                    console.log(fileContents)

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

    const deleteFile = async (fileId: string) => {
        setDeletingFile(true);
        try {
            const { data } = await axios.delete(`/files/${fileId}`);
            if (data.success) {
                toast.success("File deleted successfuly!");
                setSelectedFile(null);
                mutate();
            }
        } catch (error) {
            toast.error("Error occured while deleting file! try again later");
            console.log("error occured while deleting file");
            console.log(error);
        } finally {
            setDeletingFile(false);
        }
    }

    return {
        files: data,
        isFetching: !error && !data,
        error: error,
        getFileData,
        gettingFileData,
        deleteFile,
        deletingFile
    };

}