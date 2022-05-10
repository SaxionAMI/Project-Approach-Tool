const admin = require("./firebaseModule");
const mongoose = require("mongoose");
const User = mongoose.model("User");

/**
 * Constructs an authorization middleware pipeline that only allows a request 
 * to the given endpoint if the current user has a certain role.
 * For example, only allow admins or teachers to post new Virtual Teacher feedback rules.
 * @example Router.get('/vt-rules', authorization.hasRole(['teacher', 'admin'], controller.getRules))
 * @param {string[]} roles The roles to check for. User only needs to have one of these roles.
 */
exports.hasRole = function(roles) {
    return async function(req, res, next) {
        const decodedToken = await admin
            .auth()
            .verifyIdToken(req.headers.authorization)
            .catch(() => rejectAuth(res));
        if (!decodedToken) {
            rejectAuth(res); 
            return;
        };

        const user = await User.findOne({uid: decodedToken.uid}).catch(_ => {
            res.status(401).send({
                message: 'Unauthorized requests to this endpoint are forbidden.'
            });
        })

        const allowed = roles.indexOf(user.role) >= 0;
        if (allowed) {
            next();
        }
        else {
            res.status(401).send({
                message: 'Unauthorized requests to this endpoint are forbidden.'
            })
        }
    }
}