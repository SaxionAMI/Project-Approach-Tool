const crypto = require("crypto");
const key = process.env.CRYPTOSECRET;
 
 module.exports = {
     /**
     * This method deciphers user information, so it can be used in the mail
     * @param  {any} ciphered - the cipher to decipher
     * @return {any} deciphered - the deciphered text
     */
    decipherText(ciphered) {
        const decipher = crypto.createDecipher("aes256", key);
        let deciphered = decipher.update(ciphered, "hex", "utf8");
        deciphered += decipher.final("utf8");
        return deciphered;
    },

    /**
     * This method ciphers user information, so it can be stored in the database according to the GDPR rules
     * @param  {any} text - the text to cipher
     * @return {any} ciphered - the ciphered text
     */
    cipherText(text) {
        const cipher = crypto.createCipher("aes256", key);
        let ciphered = cipher.update(text, "utf8", "hex");
        ciphered += cipher.final("hex");
        return ciphered;
    }
};