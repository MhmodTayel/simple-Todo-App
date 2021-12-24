"use strict";

var mongoose = require("mongoose");

var bcrypt = require("bcryptjs");

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 8,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15
  },
  dob: Date,
  password: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform: function transform(doc, ret, opts) {
      delete ret.password;
      delete ret.__v;
      return ret;
    }
  }
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre("save", function () {
  var hash = bcrypt.hashSync(this.password, 10);
  this.password = hash;
});
var User = mongoose.model("User", userSchema);
module.exports = User;