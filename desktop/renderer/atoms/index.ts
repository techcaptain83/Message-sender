import { IFile } from "@/types";
import { atom } from "recoil";


export const selectedFileState = atom<IFile>({
    key: "selectedFileState",
    default: null
});