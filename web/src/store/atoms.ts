import { atom } from "recoil";

export const showAddUserModalAtom = atom({
    key: "showAddUser",
    default: false
});

export const showDeletAccountAtom = atom({
    key: "showDeletAccount",
    default: false
});

export const showSuspendAccountAtom = atom({
    key: "showSuspendAccount",
    default: false
});

// email of account we want to suspende
export const accountToSuspendAtom = atom({
    key: "accountToSuspend",
    default: ""
})

export const accountToDeleteAtom = atom({
    key: "accountToDelete",
    default: ""
});

export const showClearHistoryAtom = atom({
    key: "showClearHistory",
    default: false
});

export const showSuccessfulSignupAtom = atom({
    key: "showSuccessfulSignup",
    default: false
});

export const serialNumberAtom = atom({
    key: "serialNumber",
    default: ""
});