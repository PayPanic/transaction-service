const CryptoJS = require('crypto-js');

const ENCRYPTION_SECRET = process.env.ENCRYPTION_SECRET || 'default_secret';

function encryptCardDetails(cardDetails) {
    const ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(cardDetails),
        ENCRYPTION_SECRET
    ).toString();
    return ciphertext;
}

function decryptCardDetails(cipherText) {
    const bytes = CryptoJS.AES.decrypt(cipherText, ENCRYPTION_SECRET);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decryptedData);
}

module.exports = {
    encryptCardDetails,
    decryptCardDetails
};
