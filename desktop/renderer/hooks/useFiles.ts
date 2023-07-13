import { selectedFileState, showDeleteFileState, showUploadFileState } from "@/atoms";
import { getDecodedFileData } from "@/utils/files";
import axios from "axios.config";
import { ChangeEvent, useState } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";
import useSWR from "swr";
import useAuth from "./useAuth";


export default function useFiles() {
    const [gettingFileData, setGettingFileData] = useState(false);
    const [deletingFile, setDeletingFile] = useState(false);
    const [uploadingFile, setUploadingFile] = useState(false);
    const [selectedFile, setSelectedFile] = useRecoilState(selectedFileState);
    const [showDeleteFile, setShowDeleteFile] = useRecoilState(showDeleteFileState)
    const [downloadingFile, setDownloadingFile] = useState(false);
    const [_showUploadFile, setShowUploadFile] = useRecoilState(showUploadFileState);
    const { user } = useAuth();

    const { data, error, mutate } = useSWR(`/files?user=${user?._id}`, async (url) => {
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
                setShowDeleteFile(false);
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

    const checkIfLimitIsExceeded =(file: File): boolean => {
        let limitExceeded = false;
        const fileReader = new FileReader();
        fileReader.onload = (event) => {
            const fileContents = event.target.result as string;
            const users = fileContents.split("\n");
            const totalUsers = users.length;
            if (user.usersUploaded + totalUsers > 20 && !user.isPro) {
                toast.error("You can only upload 20 users per month! if you need more, please upgrade to primium");
                limitExceeded = true;
                return true;
            }
        };
        fileReader.readAsText(file);
        return limitExceeded;

    }

    const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
        setUploadingFile(true)
        const file = event.target.files[0];

        if (checkIfLimitIsExceeded(file)) {
            setUploadingFile(false);
            event.target.files = null;
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        axios.post(`/files/upload?user=${user._id}`, formData, {
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
            }).finally(() => {
                setUploadingFile(false);
            });
    }

    const downloadFile = async () => {
        try {

            const { data } = await axios.get(`/files/${selectedFile?._id}`)
            if (data.file) {
                const base64Data = data.file.data;
                const byteCharacters = atob(base64Data);
                const byteArrays = [];

                for (let i = 0; i < byteCharacters.length; i++) {
                    byteArrays.push(byteCharacters.charCodeAt(i));
                }

                const fileData = new Uint8Array(byteArrays);
                const blob = new Blob([fileData], { type: 'text/csv' });

                const anchor = document.createElement('a');
                anchor.href = URL.createObjectURL(blob);
                anchor.download = 'users.csv';
                anchor.click();

                URL.revokeObjectURL(anchor.href);
                toast.success("File downloaded successfuly!")
            }
        } catch (error) {
            toast.error("Error occured while downloading file! try again later");
            console.log("error occured while downloading file");
            console.log(error);
        }
    };


    return {
        files: data,
        isFetching: !error && !data,
        error: error,
        getFileData,
        gettingFileData,
        deleteFile,
        deletingFile,
        uploadingFile,
        uploadFile,
        downloadFile,
        downloadingFile
    };

}