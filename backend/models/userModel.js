"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  uid: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  study: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
