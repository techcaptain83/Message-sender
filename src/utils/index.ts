const ENCRYPT_DECRYPT_SECRET = process.env.ENCRYPT_DECRYPT_SECRET!


export const constructName = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`
}


export const encryptText = (text: string) => {
    let encryptedText = "";

    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        const encryptedCharCode = charCode ^ parseInt(ENCRYPT_DECRYPT_SECRET); // XOR operation with secret key
        encryptedText += String.fromCharCode(encryptedCharCode);
    }

    return encryptedText;
}

export const decryptText = (text: string) => {
    let decryptedText = "";

    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        const decryptedCharCode = charCode ^ parseInt(ENCRYPT_DECRYPT_SECRET); // XOR operation with secret key
        decryptedText += String.fromCharCode(decryptedCharCode);
    }

    return decryptedText;
}