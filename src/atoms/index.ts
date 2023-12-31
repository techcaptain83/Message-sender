import { IFile, ILog, IUser } from "@/types";
import { atom } from "recoil";


export const selectedFileState = atom<IFile | null>({
    key: "selectedFileState",
    default: null
});

export const showUploadFileState = atom<boolean>({
    key: "showUploadFileState",
    default: false
});

export const showUploadMediaState = atom<boolean>({
    key: "showUploadMediaState",
    default: false
});

export const showDeleteFileState = atom<boolean>({
    key: "showDeleteFileState",
    default: false
});

export const showUpgradeToPremiumState = atom<boolean>({
    key: "showUpgradeToPremiumState",
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


export const uploadedFileState = atom<IFile | null>({
    key: "uploadedFileState",
    default: null
});

export const showScanCodeState = atom<boolean>({
    key: "showScanCodeState",
    default: false
});

export const phoneConnectedState = atom({
    key: "phoneConnectedState",
    default: false
});

export const showDeleteLogState = atom<boolean>({
    key: "showDeleteLogState",
    default: false
});

export const logToDeleteState = atom<ILog | null>({
    key: "logToDeleteState",
    default: null
});