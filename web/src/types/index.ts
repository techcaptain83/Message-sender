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
    isPro: boolean;
    firstName: string;
    createdAt: string;
    lastName: string;
    email: string;
    usersUploaded: number;
    country: string;
    referredBy: string;
    datePaid: string;
    updatedAt: string;
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