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

// email of account we want to suspend
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

export const serialNumberEmailAtom = atom<{
    serialNumber: string,
    email: string,
    _id: string;
}>({
    key: "serialNumberEmail",
    default: {
        serialNumber: "",
        email: "",
        _id: ""
    }
});

export const selectedOSAtom = atom<"win" | "mac" | null>({
    key: "selectedOS",
    default: null
});

export const showSelectOsAtom = atom({
    key: "showSelectOs",
    default: false
});

export const showSelectPlanAtom = atom({
    key: "showSelectPlan",
    default: false
});

export const showPayAtom = atom({
    key: "showPay",
    default: false
});


export const showCommentsAtom = atom<{
    show: boolean,
    comments: string[],
} | null>({
    key: "showComments",
    default: null
});

export const showAddCommentAtom = atom<{ show: boolean, userId: string } | null>({
    key: "showAddComment",
    default: null
});


export const showCreateTicketModalAtom = atom({
    key: 'showCreateTicketModal',
    default: false,
});

export const showTicketDetailsModalAtom = atom({
    key: 'showTicketDetailsModal',
    default: false,
});

export const ticketDetailsAtom = atom<{ title: string, body: string, response?: string } | null>({
    key: 'ticketDetails',
    default: null,
});

export const showAnswerTicketModalAtom = atom<{
    show: boolean, ticket: {
        id: string, body: string, response?: string
    }
} | null>({
    key: "showAnswerTicket",
    default: null
});

export const showNewDepositModalAtom = atom({
    key: "showNewDepositModal",
    default: false
});


export const showPurchaseMinutesModalAtom = atom({
    key: "showPurchaseMinutesModal",
    default: false
});

export const showAddCredentialsModalAtom = atom<{
    show: boolean,
    user: { email: string, _id: string } | null
}>({
    key: "showAddCredentialsModal",
    default: {
        show: false,
        user: null
    }
});

export const showConnectPhoneModalAtom = atom({
    key: "showConnectPhoneModal",
    default: false
});

export const showNoReservationModalAtom = atom({
    key: "showNoReservationModal",
    default: false
});

export const showNoApiModalAtom = atom({
    key: "showNoApiModal",
    default: false
});


export const selectedPlanAtom = atom<"premium" | "enterprise" | "yearlyEnterprise" | null>({
    key: "selectedPlan",
    default: null
});

export const showAddMinutesManuallyAtom = atom<{
    show: boolean,
    userId: string,
    email: string
} | null>({
    key: "showAddMinutesManually",
    default: null
});

export const sendingMessagesAtom = atom({
    key: "sendingMessages",
    default: false
});

export const messageState = atom<string>({
    key: "messageState",
    default: ''
});


export const registeringLogsState = atom<boolean>({
    key: "registeringLogsState",
    default: false
});


export const showVerifyEmailModalAtom = atom({
    key: "showVerifyEmailModal",
    default: false
});