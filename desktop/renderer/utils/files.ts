import csvParser from 'csv-parser';
import { IUser } from "@/types";

export const getDecodedFileData = (base64Data: string) => {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray]);
}; 


export const getUsersFromFileContent = (fileContent: string): Promise<IUser[]> => {
    const users: IUser[] = [];

    return new Promise((resolve, reject) => {
        // Parse the CSV file content
        const parser = csvParser({ separator: ',' });

        parser.on('data', (row) => {
            // Extract the user information from each row
            const user: IUser = {
                id: row.id,
                firstName: row.firstName,
                lastName: row.lastName,
                displayName: row.displayName,
                phoneNumber: row.phoneNumber,
                countryCode: row.countryCode,
            };

            users.push(user);
        });

        parser.on('end', () => {
            resolve(users);
        });

        parser.on('error', (error) => {
            reject(error);
        });

        parser.write(fileContent);
        parser.end();
    });
};
