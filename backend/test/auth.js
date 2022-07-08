require('dotenv').config()
const superagent = require('superagent');
const admin = require("../firebaseModule");

/**
 * This function generates a valid ID token which can be used in tests
 * @param  {string} role - the user role 
 * @param  {string} uid - optional user ID 
 * @return {any} idToken - the valid ID token
 */
exports.generateToken = async (role, uid = 'token') => {
    let customToken = await admin.auth().createCustomToken(uid, { 'role': role })
    
    // Exchanges custom token for an ID token 
    return await superagent
        .post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.FIREBASE_API_KEY}`)
        .send({ token: customToken, returnSecureToken: true })
        .then(res => {
            return res.body.idToken;
        })
        .catch(err => {
            console.log(`Failed to generate token (STATUS ${err.status})`)
            return null;
        })
}
