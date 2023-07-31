export const generateUrl = (body: {
    body?: string,
    audio?: string,
    image?: string,
    video?: string,
    caption?: string
}): string => {
    let url = `https://api.ultramsg.com/instance56307/messages`;
    if (body.body) {
        url += "/chat";
    } else if (body.audio) {
        url += "/audio";
    } else if (body.image) {
        url += "/image";
    } else if (body.video) {
        url += "/video";
    }
    return url;
}