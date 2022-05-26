require('dotenv').config()
const superagent = require('superagent');
const admin = require('firebase-admin');
const serviceAccount = require('../json/adminKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://pat---project-approach-tool.firebaseio.com",
});

/**
 * This function generates a valid ID token which can be used in tests
 * @param  {any} role - the user role 
 * @return {any} idToken - the valid ID token
 */
exports.generateToken = async (role) => {
    let customToken = await admin.auth().createCustomToken('token', { 'role': role })
    
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
