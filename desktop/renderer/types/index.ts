export interface ILink {

}

export interface IUser {
    id: string;
    address: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    displayName: string;
    countryCode: string;
}

export interface IFile {
    id: string;
    fileName: string;
    updloadedAt: Date;
    usersCount: number;
}