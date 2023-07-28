import axios from "axios.config";
import { useState } from "react"
import useAuth from "./useAuth";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { uploadedFileState } from "@/atoms";


export default function useMedia() {
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingVideo, setUploadingVideo] = useState(false);
    const [uploadingAudio, setUploadingAudio] = useState(false);
    const [_, setUploadedFile] = useRecoilState(uploadedFileState);

    const { user } = useAuth();

    const uploadMedia = async (file: File, type: "image" | "video" | "audio") => {
        if (type === "image") {
            setUploadingImage(true);
        } else if (type === "video") {
            setUploadingVideo(true);
        } else if (type === "audio") {
            setUploadingAudio(true);
        }
        try {
            const formData = new FormData();
            formData.append("file", file);
            const { data } = await axios.post(`/media/upload?user=${user._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (data.message === "success") {
                toast.success("Media uploaded successfully");
                setUploadingAudio(false);
                setUploadingVideo(false);
                setUploadingImage(false);
                setUploadedFile(data.file);
            }
        } catch (error) {
            setUploadingAudio(false);
            setUploadingVideo(false);
            setUploadingImage(false);
            toast.error("Failed to upload media");
            console.log(error);
        }
    };


    return {
        uploadingAudio,
        uploadingImage,
        uploadingVideo,
        uploadMedia
    }

}