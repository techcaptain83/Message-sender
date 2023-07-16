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
    lastName: string;
    email: string;
    usersUploaded: number;
    country: string;
    serialNumber: string;
    referredBy: string;
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
    _id: string;
    filename: string;
    sentCount: number;
    failedCount: number;
    createdAt: string;
    contacts: ILogContact[]
}