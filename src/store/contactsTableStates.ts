import { IUser } from "@/types";
import { atom } from "recoil";

export const pageUsersState = atom<IUser[]>({
    key: "pageUsers",
    default: []
})