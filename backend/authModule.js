const admin = require("firebase-admin");
const serviceAccount = require("./json/adminKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pat---project-approach-tool.firebaseio.com",
});
//  The methode below verifies the id token for the routes,
//  that can be found below this methode.
module.exports = function (req, res, next) {
  if (!req.params[0].includes("/api-docs/")) {
    if (req.headers.authorization) {
      admin
        .auth()
        .verifyIdToken(req.headers.authorization)
        .then(() => {
          next();
        })
        .catch((err) => {
          res.status(403).send("Unauthorized");
        });
    } else {
      res.status(403).send("Unauthorized");
    }
  } else {
    next();
  }
};
