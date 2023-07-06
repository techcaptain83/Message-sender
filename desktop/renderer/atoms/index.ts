import { IFile, IUser } from "@/types";
import { atom } from "recoil";


export const selectedFileState = atom<IFile>({
    key: "selectedFileState",
    default: null
});

export const showUploadFileState = atom<boolean>({
    key: "showUploadFileState",
    default: false
});

export const showDeleteFileState = atom<boolean>({
    key: "showDeleteFileState",
    default: false
});


// ids of selected users
export const selectedUsersState = atom<IUser[]>({
    key: "selectedUsers",
    default: []
})

export const activeUsersState = atom<IUser[]>({
    key: "activeUsers",
    default: []
})