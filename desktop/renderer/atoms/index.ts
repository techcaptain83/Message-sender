import { IFile } from "@/types";
import { atom } from "recoil";


export const selectedFileState = atom<IFile>({
    key: "selectedFileState",
    default: null
});

export const showUploadFileState=atom<boolean>({
    key:"showUploadFileState",
    default:false
});

export const showDeleteFileState=atom<boolean>({
    key:"showDeleteFileState",
    default:false
});
