const admin = require("./firebaseModule");
const teacherEmail = process.env.TEACHER_EMAIL;
const mongoose = require("mongoose");
const User = mongoose.model("User");

function rejectAuth(res) {
  res.status(403).send(res ? "Unauthorized: " + res : "Unauthorized");
}

//  The methode below verifies the id token for the routes,
//  that can be found below this methode.
module.exports = async function (req, res, next) {
  if (req.params[0].includes("/api-docs/")) {
    next();
    return;
  } else if (!req.headers.authorization) {
    rejectAuth(res);
    return;
  }

  const decodedToken = await admin
    .auth()
    .verifyIdToken(req.headers.authorization)
    .catch(() => rejectAuth(res));
  if (!decodedToken) {
    rejectAuth(res);
    return;
  };


  const dbUser = await User
    .findOne({ uid: decodedToken.uid })
    .catch(() => console.warn(`User ${decodedToken.uid} does not exist in the local DB.`));

  if (dbUser && dbUser.email == teacherEmail && dbUser.role !== "admin") {
    // user did not have teacher role, so it must be re-enabled.
    dbUser.role = "admin";
    await User.findOneAndUpdate({ uid: dbUser.uid }, dbUser);
  }

  if (dbUser != null) {
    const authUser = await admin.auth().getUser(decodedToken.uid);
    const userRole = authUser.customClaims ? authUser.customClaims["role"] : "";
    if (userRole !== dbUser.role) {
      await admin
        .auth()
        .setCustomUserClaims(decodedToken.uid, { role: dbUser.role });

        dbUser.save();
    }
  }

  next();
};
