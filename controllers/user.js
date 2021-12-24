const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const create = (user) => User.create(user);
const find = (req) => {
  return User.find({ _id: req.user._id.toString() }, { firstName: 1, _id: 0 });
};
const deleteDoc = (_id) => User.deleteOne({ _id });
const update = (_id, body) => User.updateOne({ _id }, body);

const login = async ({ username, password }) => {
  const user = await User.findOne({ username });
  const isValid = await user.comparePassword(password);

  if (!isValid) {
    throw "UN_AUTH";
  }
  return {
    token: jwt.sign(
      {
        username,
        _id: user.id,
        maxAge: "2d",
      },
      process.env.SECRET
    ),
    user,
  };
};

module.exports = { create, find, deleteDoc, update, login };
