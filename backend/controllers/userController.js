const mongoose = require("mongoose");
const User = mongoose.model("User");
const crypto = require("crypto");
const key = process.env.CRYPTOSECRET;
const admin = require("../firebaseModule");

//  create a user account
exports.postUser = function (req, res) {
  const user = new User(req.body);
  user.firstName = cipherText(user.firstName);
  user.lastName = cipherText(user.lastName);
  user.email = cipherText(user.email);
  user
    .save()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

//  check if the submitted email is valid
exports.checkIfValidEmail = function (req, res) {
  User.find({ email: cipherText(req.body.email) })
    .then((user) => {
      if (user.length == 1) {
        res.status(200).json(true);
      } else {
        res.status(200).json(false);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while finding the user.",
      });
    });
};

//  get a user by uid
exports.getUserByUid = function (req, res) {
  const uid = req.params.uid;
  console.log("request", req.params);
  User.findOne({ uid: uid })
    .then((user) => {
      const userObj = user;
      if (userObj) {
        userObj.firstName = decipherText(userObj.firstName);
        userObj.lastName = decipherText(userObj.lastName);
        userObj.email = decipherText(userObj.email);
        res.status(200).json(userObj);
      } else {
        res.status(404).json("user not found!");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Some error occurred while finding the user.",
      });
    });
};

//  get the export data for the user
exports.getExportReadyUserData = function (req, res) {
  const uid = req.params.uid;
  User.findOne({ uid: uid }, { _id: 0, uid: 0, __v: 0 })
    .then((user) => {
      const userObj = user;
      if (userObj) {
        userObj.firstName = decipherText(userObj.firstName);
        userObj.lastName = decipherText(userObj.lastName);
        userObj.email = decipherText(userObj.email);
        res.status(200).json(userObj);
      } else {
        res.status(404).json("user is not found");
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while finding the user.",
      });
    });
};

//  update user account
exports.updateUser = function (req, res) {
  const uid = req.params.uid;
  User.exists({ uid: uid }).then((exists) => {
    if (exists) {
      const user = new User(req.body);
      user.firstName = cipherText(user.firstName);
      user.lastName = cipherText(user.lastName);
      user.email = cipherText(user.email);
      User.findOneAndUpdate({ uid: uid }, user)
        .then((user) => {
          res.status(200).json(user);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message || "Some error occurred while updating the user.",
          });
        });
    } else exports.postUser(req, res);
  });
};

//  delete user account
exports.deleteUser = function (req, res) {
  const uid = req.params.uid;
  User.findOneAndDelete({ uid: uid })
    .then((user) => {
      admin.auth().deleteUser(uid);
      res.json(user);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the user.",
      });
    });
};

exports.getUserRoles = function(req, res) {
  User.find({}).then((users) => {
    const roles = users.map((x) => ({
      uid: x.uid,
      firstName: decipherText(x.firstName),
      lastName: decipherText(x.lastName),
      role: x.role,
      school: x.school,
      study: x.study
    }));
    res.status(200).json(roles);
  }).catch((error) => {
    console.error(error);
    res.status(500).send("Some error occurred while retrieving user roles.");
  });
};

exports.setUserRole = function(req, res) {
  const userId = req.params.uid;
  const role = req.body.role;
  const supportedRoles = ["student", "teacher", "admin"];

  if (!userId || !role) {
    res.status(400).send("Missing one or more required request parameters.");
    return;
  }
  if (!supportedRoles.includes(role)) {
    res.status(400).send("'" + role + "' is not a supported user role.");
  }
  User.updateOne({ uid: userId }, {
    $set: { role: role }
  }).then((_) => {
    admin.auth().setCustomUserClaims(userId, { role: role }).then((_) => {
      User.findOne({ uid: userId }).then((x) => {
        res.status(200).json({
          uid: x.uid,
          firstName: x.firstName,
          lastName: x.lastName,
          role: x.role,
          school: x.school,
          study: x.study
        });
      });
    });
  }).catch((error) => {
    console.error(error);
    res.status(500).send("Some error occurred while assigning the new user role.");
  });
};

/**
 * This method deciphers user information, so it can be used in the mail
 * @param  {any} ciphered - the cipher to decipher
 * @return {any} deciphered - the deciphered text
 */
function decipherText(ciphered) {
  const decipher = crypto.createDecipher("aes256", key);
  let deciphered = decipher.update(ciphered, "hex", "utf8");
  deciphered += decipher.final("utf8");
  return deciphered;
}

/**
 * This methode ciphers user information, so it can be stored in the database according to the GDPR rules
 * @param  {any} text - the text to cipher
 * @return {any} ciphered - the ciphered text
 */
function cipherText(text) {
  const cipher = crypto.createCipher("aes256", key);
  let ciphered = cipher.update(text, "utf8", "hex");
  ciphered += cipher.final("hex");
  return ciphered;
}
