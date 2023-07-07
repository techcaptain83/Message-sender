export interface ILink {

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
    lastName: string;
    email: string;
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