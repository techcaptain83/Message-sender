export interface ILink {
    name: string;
    href: string;
    icon: any
    current?: boolean
}


export interface IPerson {
    firstName: string;
    lastName: string;
    email: string;
    joinedAt: string;
    phoneNumber: string;
}

export interface ICall {
    from: IPerson
    to: IPerson
    callDuration: string;
    startedAt: Date;
    status: 'ongoing' | 'ended';
}

export interface IOrder {
    orderedBy: IPerson;
    orderedAt: Date;
    status: 'pending' | 'completed' | 'cancelled';
}

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    displayName: string;
    countryCode: string;
}
export interface IAuthUser {
    _id: string;
    plan: "free" | "pro" | "enterprise"
    isAdmin: boolean;
    firstName: string;
    manual: boolean;
    createdAt: string;
    lastName: string;
    email: string;
    usersUploaded: number;
    country: string;
    referredBy: string;
    datePaid: string;
    comments?: string[],
    browser?: string,
    verified?: boolean;
    updatedAt: string;
    balance: number;
    availableTime: number;
    api?: {
        instanceId: string;
        token: string;
    }
}

export interface ITicket {
    _id: string;
    title: string,
    body: string,
    createdAt: string,
    createdBy: IUser,
    response?: string,
    status: "open" | "closed"
}

export interface IFile {
    _id: string;
    filename: string;
    createdAt: string;
    updatedAt: string;
    // usersCount: number;
}

export interface IFile {
    _id: string;
    filename: string;
    fileUrl: string;
    type: string;
}


export interface ILogContact {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    sent: boolean,
}
export interface ILog {
    _id?: string;
    filename: string;
    sentCount: number;
    failedCount: number;
    createdAt: string;
    contacts: ILogContact[]
}

export interface IDeposit {
    _id: string;
    amount: number;
    createdAt: string;
    depositedBy: IAuthUser;
    status: "pending" | "completed" | "cancelled";
}

export interface IReservation {
    _id: string;
    createdBy: IAuthUser;
    startsAt: string;
    endsAt: string;
}

export interface ICard {
    cardNumber: string,
    expMonth: string,
    expYear: string,
    cvv: string,
    cardType: 'VISA' | 'MASTERCARD'
}