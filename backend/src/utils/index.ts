
export const generateApiKey = (): string => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};


export const generatePromoCode = (): string => {
    return Math.random().toString(36).substring(2, 8)
};

export const generateTicketId = (): string => {
    return Math.random().toString(36).substring(2, 8)
}