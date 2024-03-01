export const generateVerificationCode = () => {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return Array.from({ length: 6 }, () => characters[Math.floor(Math.random() * characters.length)]).join('').toUpperCase();
};
