const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = mongoose.model("User");
const Workspace = mongoose.model("Workspace");

//  invite all users to a workspace
exports.inviteUsers = function (req, res) {
  const transporter = nodemailer.createTransport({
    service: process.env.MAILSERVICE,
    auth: {
      user: process.env.MAILACCOUNT,
      pass: process.env.MAILPASS,
    },
  });
  req.body.users.forEach((email) => {
    jwt.sign(
      { user: email, id: req.body.workspace },
      process.env.JWTTOKEN,
      { expiresIn: "1h" },
      function (err, token) {
        transporter.verify(function (error, success) {
          if (error) {
            console.log(error);
          } else {
            const url = process.env.INVITEURL + token;
            User.findOne({ email: cipherText(email) }, function (err, user) {
              Workspace.findOne({ _id: req.body.workspace }, function (
                err,
                workspace,
              ) {
                transporter.sendMail(
                  {
                    to: email,
                    subject: "Invitation project",

                    html: `
                    Dear ${decipherText(user.firstName)} ${decipherText(
                      user.lastName,
                    )}, <br>
                    <br>
                    ${req.body.invitee.firstName} ${
                      req.body.invitee.lastName
                    } has invited you to the following workspace: ${
                      workspace.title
                    }. <br>
                    <br>
                    Please click this link to gain access: <a href="${url}"> Access workspace</a>.<br>
                    <br>
                    Sincerely, <br>
                    The project approach tool team`,
                  },
                  (error, info) => {
                    if (error) {
                      res.json(error.status);
                    } else {
                      res.json(200);
                    }
                  },
                );
              });
            });
          }
        });
      },
    );
  });
};

//  confirm an invitation email
exports.confirmInvite = function (req, res) {
  jwt.verify(req.params.id, process.env.JWTTOKEN, function (err, decoded) {
    if (err) {
      res.send(
        "invite token has been expired! request a new invite to the workspace.",
      );
      /**
       * TODO: redirect to new angular error page.
       * stating that the invite has been expired and that a new invite has to be requested.
       */
    } else {
      const cipher = cipherText(decoded.user.toString());
      User.findOne({ email: cipher }, function (req, user) {
        Workspace.findById(decoded.id, function (req, workspace) {
          const newWorkspace = workspace;

          if (!newWorkspace.users.some((e) => e.uid === user.uid)) {
            const email = decipherText(user.email);
            const index = newWorkspace.users.findIndex((u) => u.email == email);
            if (index > 0) {
              newWorkspace.users.splice(index, 1, { uid: user.uid, type: 1 });
              Workspace.findByIdAndUpdate(
                decoded.id,
                newWorkspace,
                function () {
                  res.redirect(
                    process.env.REDIRECTURL + decoded.id,
                  );
                },
              );
            } else {
              res.status.send(
                "invite token has been expired! request a new invite to the workspace.",
              );
            }
          } else {
            res.redirect(process.env.REDIRECTURL + decoded.id);
          }
        });
      });
    }
  });
};

/**
 * This method deciphers user information, so it can be used in the mail
 * @param  {string} ciphered - the cipher to decipher
 * @return {string} deciphered - the deciphered text
 */
function decipherText (ciphered) {
  const decipher = crypto.createDecipher("aes256", process.env.CRYPTOSECRET);
  let deciphered = decipher.update(ciphered, "hex", "utf8");
  deciphered += decipher.final("utf8");
  return deciphered;
}
/**
 * This methode ciphers user information, so it can be stored in the database according to the GDPR rules
 * @param  {string} text - the text to cipher
 * @return {string} ciphered - the ciphered text
 */
function cipherText (text) {
  const cipher = crypto.createCipher("aes256", process.env.CRYPTOSECRET);
  let ciphered = cipher.update(text, "utf8", "hex");
  ciphered += cipher.final("hex");
  return ciphered;
}
