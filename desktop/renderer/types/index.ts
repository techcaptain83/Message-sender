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

export interface IFile {
    _id: string;
    filename: string;
    createdAt:string;
    updatedAt:string;
    // usersCount: number;
}