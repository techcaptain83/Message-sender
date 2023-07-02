import { showDeleteFileState, showUploadFileState } from "@/atoms";
import { getDecodedFileData } from "@/utils/files";
import axios from "axios.config";
import { ChangeEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";
import useSWR from "swr";


export default function useFiles() {
    const [gettingFileData, setGettingFileData] = useState(false);
    const [deletingFile, setDeletingFile] = useState(false);
    const [uploadingFile, setUploadingFile] = useState(false);
    const [_seletedFile, setSelectedFile] = useRecoilState(showDeleteFileState)
    const [_showUploadFile, setShowUploadFile] = useRecoilState(showUploadFileState)

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

    const getFileData = async (fileId: string): Promise<string | ArrayBuffer> => {
        setGettingFileData(true);
        try {
            let fileContents: string = "";
            const { data } = await axios.get(`/files/${fileId}`);
            if (data.file) {
                const decodedData = getDecodedFileData(data.file.data);
                const fileReader = new FileReader();
                fileReader.onload = (event) => {
                    fileContents = event.target.result as string; 
                };
                fileReader.readAsText(decodedData);
            }
            return fileContents;
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

    const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
        setUploadingFile(true)
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append('file', file);

        axios.post('/files/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(response => {
                toast.success("File uploaded successfuly!");
                mutate();
                event.target.files = null;
                setShowUploadFile(false);
            })
            .catch(error => {
                console.error('Error uploading file:', error);
                toast.error("Error occured while uploading file! try again later");
            }).finally(()=>{
                setUploadingFile(false);
            })
    }

    return {
        files: data,
        isFetching: !error && !data,
        error: error,
        getFileData,
        gettingFileData,
        deleteFile,
        deletingFile,
        uploadingFile,
        uploadFile

    };

}