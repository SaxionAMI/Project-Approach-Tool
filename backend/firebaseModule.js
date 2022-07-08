const admin = require("firebase-admin");
const serviceAccount = require("./json/adminKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pat---project-approach-tool.firebaseio.com",
});

module.exports = admin;