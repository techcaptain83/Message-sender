import { selectedFileState, showDeleteFileState, showUploadFileState } from "@/atoms";
import axios from "@/axios.config";
import { getDecodedFileData } from "@/utils/files";
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

    // @ts-ignore
    const getFileData = async (fileId: string): Promise<string | ArrayBuffer> => {
        setGettingFileData(true);
        try {
            let fileContents: string = "";
            const { data } = await axios.get(`/files/${fileId}`);
            if (data.file) {
                const decodedData = getDecodedFileData(data.file.data);
                const fileReader = new FileReader();
                fileReader.onload = (event) => {
                    fileContents = event.target?.result as string;
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
            const { data } = await axios.delete(`/files/${fileId}?user=${user?._id}`);
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

    const checkIfLimitIsExceeded = async (file: File): Promise<{
        hasExceededLimit: boolean,
        totalUsers: number,
    }> => {
        return new Promise<{
            hasExceededLimit: boolean,
            totalUsers: number,
        }>((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.onload = (event) => {
                const fileContents = event.target?.result as string;
                const lines = fileContents.split("\n");
                // remove empty lines and headers
                const users = lines.filter((line) => line && !line.includes("firstName"));
                const totalUsers = users.length;
                const usersUploaded = user?.usersUploaded || 0;
                console.log(totalUsers)
                if (usersUploaded + totalUsers > 20 && !user?.isPro) {
                    toast.error("You can only upload 20 contacts with the free trial version. Upgrade to PREMIUM for unlimited.");
                    resolve({
                        hasExceededLimit: true,
                        totalUsers
                    });
                } else {
                    resolve({
                        hasExceededLimit: false,
                        totalUsers
                    });
                }
            };
            fileReader.onerror = () => {
                reject(new Error("An error occurred while reading the file."));
            };
            fileReader.readAsText(file);
        });
    };

    const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
        setUploadingFile(true);
        // @ts-ignore
        const file = event.target.files[0];

        try {
            const limitExceeded = await checkIfLimitIsExceeded(file);
            if (limitExceeded.hasExceededLimit) {
                setUploadingFile(false);
                event.target.files = null;
                return;
            }

            const formData = new FormData();
            formData.append('file', file);


            await axios.post(`/files/upload?user=${user?._id}&totalUsers=${limitExceeded.totalUsers}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success("File uploaded successfully!");
            mutate();
            event.target.files = null;
            setShowUploadFile(false);
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error("An error occurred while uploading the file. Please try again later.");
        } finally {
            setUploadingFile(false);
        }
    };


    const downloadFile = async () => {
        try {

            const { data } = await axios.get(`/files/${selectedFile?._id}`)
            if (data.file) {
                const base64Data = data.file.data;
                const byteCharacters = atob(base64Data);
                const byteArrays: number[] = [];

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